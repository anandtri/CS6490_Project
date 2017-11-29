#!/usr/bin/env python

import configparser
from bs4 import BeautifulSoup
from collections import Counter
import sys
from urllib import urlopen

config = configparser.ConfigParser()
config.read('settings.ini')


NGRAM_SIZE = config.getint("ml_module","ngram_size")


class MlModule:

    def __init__(self, web_response=None, proxy_response=None):
        """
        TODO: Better Representation
        :param web_response:
        :param proxy_response:
        """
        self.web_response = web_response
        self.proxy_response = proxy_response

    @staticmethod
    def generate_n_grams(html):
        """
        Extract plaintext from HTML response.
        Generate N-Gram
        :return: Ngram Map
        """
        ngrams = {}
        soup = BeautifulSoup(html, 'html.parser')
        text_response = soup.get_text()
        text_response = text_response.split()   # Get words
        ngram_list = ["".join(text_response[i:i+NGRAM_SIZE]) for i in range(0, len(text_response)-NGRAM_SIZE+1)]
        return Counter(ngram_list)

    @staticmethod
    def cal_jaccard_distance(ngram_list1, ngram_list2):
        """
        Calulate jaccard distance from ngrams.
        :param ngram_list1:
        :param ngram_list2:
        :return: Jaccard distance in [0,1]
        """

        set_1 = set(ngram_list1)
        set_2 = set(ngram_list2)
        intersection = 0
        union = 0
        for ngram in set_1.intersection(set_2):
            intersection += ngram_list2[ngram] + ngram_list1[ngram]
        for ngram in set_1.union(set_2):
            union += ngram_list2[ngram] + ngram_list1[ngram]

        jaccard_dist = float(intersection)/float(union)
        return jaccard_dist

    def calc_content_similarity(self):
        """
        TODO: Extract html from two responses

        :return: Similarity score for content. Jaccard score.
        """

    def detect_cloaking(self):
        """
        TODO: Combine result
        :return: True if cloaking detected, false otherwise
        """


def serve():
    """
    TODO : Write RPC server
    :return:
    """


if __name__ == "__main__":
    if len(sys.argv) < 2:
        serve()
    else:
        # Test Code.
        classifier = MlModule()
        url1 = sys.argv[1]
        url2 = sys.argv[2]
        score = classifier.cal_jaccard_distance(
            classifier.generate_n_grams(urlopen(url1).read()),
            classifier.generate_n_grams(urlopen(url2).read())
        )
        print score
        if url1 == url2:
            assert score >= 0.95, "Different value for same url"
        else:
            print url1, url2, "are similar with a score of ", score


