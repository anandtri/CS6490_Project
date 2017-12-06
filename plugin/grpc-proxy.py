from flask import Flask

import re
import time
import os
import sys
sys.path.append(os.path.abspath("../proto"))

import grpc
import decloak_pb2
import decloak_pb2_grpc
import logging
import traceback as tb
import json

logging.basicConfig(filename='grpc-proxy.log', level=logging.INFO,
                    format='%(asctime)s %(message)s')

from flask import request, make_response

app = Flask(__name__)

@app.route('/isCloaked', methods=['POST'])
def isCloaked():
    try:
        if request.method == 'POST':
            params = None
            if request.headers.get('Content-Type') == 'application/json':
                params = request.json
            else:
                params = request.form

            logging.info("received POST request with data:" + str(params))

            result = {'cloaked': False, 'response':"Error", 'err':2}

            MLapp_ADDRESS = params['mlapp_address']
            body = params['content']
            webPage = decloak_pb2.WebPage()
            webPage.URL = params['url']
            webPage.status = int(params['statusCode'])
            webPage.reason = params['statusLine']
            webPage.redirtype = decloak_pb2.WebPage.NONE
            webPage.body = body

            lwp = decloak_pb2.ListWebPage()
            lwp.WebPages.extend([webPage])
            # Fetching MLapp response
            channel = grpc.insecure_channel(MLapp_ADDRESS)
            stub = decloak_pb2_grpc.CloakDetectorStub(channel)
            res = stub.isCloaked(lwp)
            result['cloaked'] = res.cloaked
            result['response'] =res.response
            result['err'] = res.Err
            return make_response(json.dumps(result), 200)
    except Exception as E:
            logging.info(tb.format_exc())
            return make_response(json.dumps(result), 200)
