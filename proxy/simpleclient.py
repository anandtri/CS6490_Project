#!/usr/bin/env python

import os, sys

import grpc

sys.path.append(os.path.abspath("../proto"))
import decloak_pb2
import decloak_pb2_grpc

def fetchurl(url):
    print "Fetching URL from proxy: ", url
    channel = grpc.insecure_channel('localhost:50051')
    stub = decloak_pb2_grpc.FetchProxyStub(channel)
    for res in stub.fetchPage(decloak_pb2.FetchURL(URL=url)):
	print "===> BASIC INFO <==="
        print "URL: ", res.URL
        print "Code: ", res.status, ", Reason: ", res.reason
        if res.redirtype != decloak_pb2.WebPage.NONE:
            print "Redirect: ", res.redirURL
            if res.redirtype == decloak_pb2.WebPage.BODY:
                print "Redir type: body"
            else:
                print "Redir type: http"
        print "===> HEADERS <==="
        for hdr in res.headers:
            print "%s: %s" % (hdr.key, hdr.val)
	print "===> BODY <==="
        lines = res.body.split("\n")
        for line in lines:
            print line.encode('utf-8')
	print "==> END PAGE <=="
        print ""

if __name__ == '__main__':
    url = sys.argv[1]
    fetchurl(url)
