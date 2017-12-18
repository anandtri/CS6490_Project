#!/usr/bin/env python

import configparser
from bs4 import BeautifulSoup
from collections import Counter
import sys
import grpc
import re
import time
import os
sys.path.append(os.path.abspath("../proto"))
import decloak_pb2
import decloak_pb2_grpc
from concurrent import futures
import logging

logging.basicConfig(filename='detction.log', level=logging.INFO,
                    format='%(asctime)s %(message)s')

config = configparser.ConfigParser()
config.read('settings.ini')

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


NGRAM_SIZE = config.getint("ml_module","ngram_size")
CONTENT_WEIGHT = config.getfloat("ml_module", "content_weight")
LINKS_WEIGHT = config.getfloat("ml_module", "links_weight")
PROXY_ADDRESS = config.get("proxy", "address")
MY_ADDRESS = config.get("ml_module", "address")
DETECTION_THRESHOLD = config.getfloat("ml_module", "threshold")
REDIRECTION_THRESHOLD = config.getint("ml_module", "redirect_threshold")
DEBUG_DUMP = config.getboolean("ml_module", "debug_dump")
DUMP_DIRECTORY = config.get("ml_module", "dump_directory")
if DEBUG_DUMP:
    if not os.path.exists(DUMP_DIRECTORY):
        os.makedirs(DUMP_DIRECTORY)

# Errors
PROXY_ERROR = 1
NONE = 0
ERROR = 2


class MlModule:

    @staticmethod
    def extract_content_feature(html):
        """
        Extract plaintext from HTML response.
        Generate N-Gram for content.
        :return: ngram map and list of embedded urls
        """
        ngrams = {}
        try:
            soup = BeautifulSoup(html, 'html.parser')
            text_response = soup.get_text()
            text_response = re.sub("[^\w]", " ",  text_response).split() #text_response.split()   # Get words
            ngram_list = ["".join(text_response[i:i+NGRAM_SIZE]) for i in range(0, len(text_response)-NGRAM_SIZE+1)]
            links = soup.find_all('a')
            urls = []
            for tag in links:
                link = tag.get("href", None)
                if link is not None:
                    urls.append(link)
            return ngram_list, urls
        except Exception as E:
            print "Error while parsing html", E
            return [], []

    @staticmethod
    def cal_jaccard_distance(list1, list2):
        """
        Calulate jaccard distance between two lists.
        :param list1:
        :param list2:
        :return: Jaccard distance in [0,1]
        """

        histogram_list1 = Counter(list1)
        historgram_list2 = Counter(list2)
        set_1 = set(histogram_list1)
        set_2 = set(historgram_list2)
        intersection = 0
        union = 0
        for ngram in set_1.intersection(set_2):
            intersection += histogram_list1[ngram] + historgram_list2[ngram]
        for ngram in set_1.union(set_2):
            union += historgram_list2[ngram] + histogram_list1[ngram]

        jaccard_dist = float(intersection)/float(union)
        return jaccard_dist

    def calc_content_similarity(self, web_response=None, proxy_response=None):
        """
        TODO: Extract html from two responses

        :return: Similarity score for content. Jaccard score.
        """
        web_ngrams, web_links = self.extract_content_feature(web_response.body)
        proxy_ngrams, proxy_links = self.extract_content_feature(proxy_response.body)
        text_score = self.cal_jaccard_distance(web_ngrams, proxy_ngrams)
        link_score = self.cal_jaccard_distance(web_links, proxy_links)
        logging.info("\tText score %f, Link score %f" % (text_score, link_score))
        score = text_score * CONTENT_WEIGHT + link_score * LINKS_WEIGHT
        return score

    @staticmethod
    def url_to_str(string):
        return "".join(string.split("/"))

    def isCloaked(self, webresponse, context):
        """
        TODO: Combine result
        :return: True if cloaking detected, false otherwise
        """
        # Fetching proxy response
        result = decloak_pb2.MlResponse()
        result.cloaked = False
        result.response = "Success"
        result.Err = NONE
        web_response = []
        for res in webresponse.WebPages:
            web_response.append(res)
        proxy_response = []
        try:
            channel = grpc.insecure_channel(PROXY_ADDRESS)
            stub = decloak_pb2_grpc.FetchProxyStub(channel)
            for res in stub.fetchPage(decloak_pb2.FetchURL(URL=web_response[0].URL)):
                proxy_response.append(res)
        except Exception as E:
            logging.info("\tProxy Failure")
            result.Err = PROXY_ERROR
            result.response = "Proxy Failure"
            return result

        logging.info(web_response[0].URL)
        if len(proxy_response) <= 0:
            logging.info("\tProxy Failure")
            result.Err = PROXY_ERROR
            result.response = "Proxy Failure"
            return result

        # Verify the final page url is same otherwise redirect chain cloaking
        if web_response[-1].URL != proxy_response[-1].URL:
            logging.info("\tURL differs %s %s" % (web_response[-1].URL, proxy_response[-1].URL))
            result.cloaked = True
            result.response = "Final URL differs"
            return result

        if len(web_response) > REDIRECTION_THRESHOLD or len(proxy_response) > REDIRECTION_THRESHOLD:
            logging.info("\tExcessive Redirection %d %d", len(web_response), len(proxy_response))
            result.cloaked = True
            result.response = "Excessive Redirection"
            return result

        # Content Similarity
        try:
            content_similarity_score = self.calc_content_similarity(web_response[-1], proxy_response[-1])
            logging.info("\tFinal Score %f " % content_similarity_score)
            if content_similarity_score < DETECTION_THRESHOLD:
                # Dump html content for debugging
                if DEBUG_DUMP:
                    with open(os.path.join(DUMP_DIRECTORY,
                                           self.url_to_str(web_response[-1].URL.replace(":", "_"))) + "_browser.html", "w") as f:
                        f.write(web_response[-1].body.encode("utf-8"))
                    with open(os.path.join(DUMP_DIRECTORY,
                                           self.url_to_str(proxy_response[-1].URL.replace(":", "_"))) + "_proxy.html", "w") as f:
                        f.write(proxy_response[-1].body.encode("utf-8"))
                result.cloaked = True
                result.response = "Content Differs"
                return result
            else:
                return result
        except Exception as E:
            logging.info("\tModule Failure: {}".format(E))
            result.Err = ERROR
            return result

def serve():
    """
    Start RPC server (From proxy.py
    """
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    decloak_pb2_grpc.add_CloakDetectorServicer_to_server(MlModule(), server)
    server.add_insecure_port(MY_ADDRESS)
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
        # Test Code
        channel = grpc.insecure_channel(PROXY_ADDRESS)
        test = decloak_pb2.ListWebPage()
        stub = decloak_pb2_grpc.FetchProxyStub(channel)
        respon = []
        for res in stub.fetchPage(decloak_pb2.FetchURL(URL=sys.argv[1])):
            respon.append(res)
        test.WebPages.extend(respon)
        ml_module = MlModule()
        print ml_module.isCloaked(test, {})




