#!/usr/bin/env python

import os, sys
import re
import time
import httplib
from urlparse import urlparse
from concurrent import futures

import grpc

sys.path.append(os.path.abspath("../proto"))
import decloak_pb2
import decloak_pb2_grpc

#
# Global constants
#

MAXREDIR = 10
TIMEOUT = 10

CRAWLERAGENT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

BODYPATS = [
    re.compile('window.location.href\s*=\s*["\'](.+?)["\']'),
    re.compile('window.location\s*=\s*["\'](.+?)["\']'),
]

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


class pageFetcher(decloak_pb2_grpc.FetchProxyServicer):

    def fetchPage(self, request, context):
        """Fetches requested page, following redirects. returns stream of
        found pages.
        """
        try:
            chain = self.crawlerfetch(request.URL)
            for url, res, data in chain:
                wp = decloak_pb2.WebPage(URL = url, status = res.status,
                                         reason = res.reason, body = data)
                if res.redir:
                    wp.redirURL = res.redir
                    if res.status == 200:
                        wp.redirtype = decloak_pb2.WebPage.BODY
                    else:
                        wp.redirtype = decloak_pb2.WebPage.HTTP
                else:
                    wp.redirtype = decloak_pb2.WebPage.NONE
                for k,v in res.getheaders():
                    hdr = wp.headers.add()
                    hdr.key = k
                    hdr.val = v
                yield wp
        except:
            # XXX: Handle failed page chain fetch.
            pass
    
    def _fetch(self, url, headers):
        # Parse URL into components
        purl = urlparse(url)

        # Setup the connection object based on URL type.
        conn = None
        if purl.scheme == 'https':
            conn = httplib.HTTPSConnection(purl.netloc, timeout = TIMEOUT)
            headers['IsSecureConnection'] = 'True'
        else:
            conn = httplib.HTTPConnection(purl.netloc, timeout = TIMEOUT)
            headers['IsSecureConnection'] = 'False'

        # Assemble URL path
        path = purl.path
        if purl.params:
            path = path + ";" + purl.params
        if purl.query:
            path = path + "?" + purl.query
        if purl.fragment:
            path = path + "#" + purl.fragment
        if not path:
            path = "/"
            
        # Fetch page from server
        conn.request("GET", path, headers = headers)
        resp = conn.getresponse()
        data = resp.read()
        conn.close()

        return resp, data

    def _bodyredir(self, data):
        """Search each defined body pattern, returning the URL from the
        first match found (if any).
        """
        url = None
        for pat in BODYPATS:
            m = pat.search(data)
            if m:
                url = m.group(1)
                break
        return url
    
    def crawlerfetch(self, url):
        # Setup headers
        headers = {
            'Url': url,
            'Method': 'GET',
            'IsAuthenticated': 'False',
            'Connection': 'Keep-alive',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            #'Accept-Encoding': 'gzip,deflate,br',
            'From': 'googlebot(at)googlebot.com',
            'User-Agent': CRAWLERAGENT,
        }

        # Dig through redirections.
        # XXX: Update to handle cookies.
        accum = []
        lastcookie = None
        for i in range(MAXREDIR):
            if lastcookie:
                headers['Cookie'] = lastcookie
            elif 'Cookie' in headers:
                del headers['Cookie']
            resp, data = self._fetch(url, headers)
            resp.redir = None
            lastcookie = resp.getheader('set-cookie')
            accum.append((url, resp, data))
            if resp.status > 300 and resp.status < 310:
                url = resp.getheader('location')
                print "Chasing redirect: %s" % url
            elif resp.status == 200:
                url = self._bodyredir(data)
                if not url:
                    break
            else:
                print "Unhandled response code %d: %s" % (resp.status, resp.reason)
                break
            resp.redir = url
        return accum

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    decloak_pb2_grpc.add_FetchProxyServicer_to_server(pageFetcher(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    try:
        while True:
            time.sleep(_ONE_DAY_IN_SECONDS)
    except KeyboardInterrupt:
        server.stop(0)
    
if __name__ == "__main__":
    if len(sys.argv) < 2:
        serve()
    else:
        fetcher = pageFetcher()
        url = sys.argv[1];
        print "Fetching %s" % url
        chain = fetcher.crawlerfetch(url)
        print "%d redirects found" % (len(chain) - 1)
        print "\n"
        for url,res,data in chain:
            print "URL: %s" % url
            print "Code: %d, Reason: %s" % (res.status, res.reason)
            if res.redir:
                print "Redir: %s" % res.redir
            print "Headers: ", res.getheaders()
            lines = data.split("\n")
            for line in lines:
                print line
            print ""
