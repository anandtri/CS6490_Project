#!/usr/bin/env python

import sys
import re
import httplib
from urlparse import urlparse

MAXREDIR = 10
TIMEOUT = 10

CRAWLERAGENT = "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

BODYPATS = [
    re.compile('window.location.href\s*=\s*["\'](.+?)["\']'),
    re.compile('window.location\s*=\s*["\'](.+?)["\']'),
]

class pageFetcher:
    def __init__(self):
        pass
    
    def _fetch(self, url, headers):

        # Parse URL into components
        purl = urlparse(url)

        # Setup the connection object based on URL type.
        conn = None
        if purl.scheme == 'https':
            conn = httplib.HTTPSConnection(purl.netloc, timeout = TIMEOUT)
        else:
            conn = httplib.HTTPConnection(purl.netloc, timeout = TIMEOUT)

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
        url = None
        for pat in BODYPATS:
            m = pat.search(data)
            if m:
                url = m.group(1)
                break
        return url
    
    def crawlerfetch(self, url):
        # Setup headers
        headers = {'USER_AGENT': CRAWLERAGENT}

        # Dig through redirections.
        # XXX: Update to handle exceptions and cookies.
        accum = []
        for i in range(MAXREDIR):
            resp, data = self._fetch(url, headers)
            resp.redir = None
            accum.append((url, resp, data))
            if resp.status > 300 and resp.status < 310:
                url = resp.getheader('location')
                print "Chasing redirect: %s" % url
            elif resp.status == 200:
                burl = self._bodyredir(data)
                if burl:
                    url = burl
                else:
                    break
            else:
                print "Unhandled response code %d: %s" % (resp.status, resp.reason)
                break
            resp.redir = url
        return accum

if __name__ == "__main__":
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
