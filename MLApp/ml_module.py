#!/usr/bin/env python

import configparser
from bs4 import BeautifulSoup
from collections import Counter
import sys
import grpc
import time
from enum import Enum
import os
from urllib import urlopen
sys.path.append(os.path.abspath("../proto"))
import decloak_pb2
import decloak_pb2_grpc
from concurrent import futures

config = configparser.ConfigParser()
config.read('settings.ini')

_ONE_DAY_IN_SECONDS = 60 * 60 * 24


NGRAM_SIZE = config.getint("ml_module","ngram_size")
CONTENT_WEIGHT = config.getfloat("ml_module", "content_weight")
LINKS_WEIGHT = config.getfloat("ml_module", "links_weight")
PROXY_ADDRESS = config.get("proxy", "address")
MY_ADDRESS = config.get("ml_module", "address")
DETECTION_THRESHOLD = config.getfloat("ml_module", "threshold")


# Errors
class Errors(Enum):
    PROXY_ERROR = 1
    NONE = 0
    ERROR = 2



class MlModule:

    def __init__(self):
        self.web_response = []
        self.proxy_response = []

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
            text_response = text_response.split()   # Get words
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

    def calc_content_similarity(self, web_response_html, proxy_response_html):
        """
        TODO: Extract html from two responses

        :return: Similarity score for content. Jaccard score.
        """
        web_ngrams, web_links = self.extract_content_feature(web_response_html)
        proxy_ngrams, proxy_links = self.extract_content_feature(proxy_response_html)
        text_score = self.cal_jaccard_distance(web_ngrams, proxy_ngrams)
        link_score = self.cal_jaccard_distance(web_links, proxy_links)
        score = text_score * CONTENT_WEIGHT + link_score * LINKS_WEIGHT
        return score

    def isCloaked(self, webresponse):
        """
        TODO: Combine result
        :return: True if cloaking detected, false otherwise
        """
        # Fetching proxy response
        self.web_response = webresponse
        result = decloak_pb2.MlResponse()
        result.cloaked = False
        result.response = "Success"
        result.Err = Errors.NONE
        try:
            channel = grpc.insecure_channel(PROXY_ADDRESS)
            stub = decloak_pb2_grpc.FetchProxyStub(channel)
            for res in stub.fetchPage(decloak_pb2.FetchURL(URL=webresponse[0].url)):
                self.proxy_response.append(res)
                print res
        except:
            result.Err = Errors.PROXY_ERROR
            result.response = "Proxy Failure"
            return result
        # Content similarity
        content_similarity_score = self.calc_content_similarity()
        if content_similarity_score > DETECTION_THRESHOLD:
            result.cloaked = True
            result.response = "Content Differs"
            return result
        else:
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
        # Test Code.
        classifier = MlModule()
        url1 = sys.argv[1]
        url2 = sys.argv[2]
        url1_ngrams, url1_links = classifier.extract_content_feature(urlopen(url1).read())
        url2_ngrams, url2_links = classifier.extract_content_feature(urlopen(url2).read())
        text_score = classifier.cal_jaccard_distance(url1_ngrams, url2_ngrams)
        link_score = classifier.cal_jaccard_distance(url1_links, url2_links)

        score = text_score * CONTENT_WEIGHT + link_score * LINKS_WEIGHT
        print text_score, link_score, score
        if url1 == url2:
            assert score >= 0.95, "Different value for same url"
        else:
            print url1, url2, "are similar with a score of ", score



