#!/usr/bin/env python

import os, sys
import argparse

import grpc

sys.path.append(os.path.abspath("../proto"))
import decloak_pb2
import decloak_pb2_grpc

DEFREMPORT = 50051

def fetchurl(args):
    print "Fetching URL from proxy: ", args.url
    channel = grpc.insecure_channel("%s:%d" % (args.remote, int(args.port)))
    stub = decloak_pb2_grpc.FetchProxyStub(channel)
    for res in stub.fetchPage(decloak_pb2.FetchURL(URL=args.url)):
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
    pr = argparse.ArgumentParser()
    #pr.add_argument("-d", help="Turn on debugging output.", action="store_true")
    pr.add_argument("url", help="URL to lookup.")
    pr.add_argument("--remote", help="Specify host to connect to. If not specified, connect to localhost.", default='localhost')
    pr.add_argument("--port", help="Specify port for remote host (default: %d)." % DEFREMPORT, default=DEFREMPORT)

    # Parse command line and do stuff.
    args  = pr.parse_args()
    fetchurl(args)
