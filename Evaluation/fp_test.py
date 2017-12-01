import sys
import os
sys.path.append(os.path.abspath("../proto"))
import decloak_pb2
import decloak_pb2_grpc
import grpc
import re
import configparser
import logging

logging.basicConfig(filename='fptest.log', level=logging.INFO,
                    format='%(asctime)s %(message)s')

config = configparser.ConfigParser()
config.read('../MLApp/settings.ini')
ADDRESS = config.get("ml_module", "address")
from selenium import webdriver

channel = grpc.insecure_channel(ADDRESS)
stub = decloak_pb2_grpc.CloakDetectorStub(channel)

def get_cloak_info(url):
    browser = webdriver.Firefox()
    try:
        print url
        browser.get(url)
        test = decloak_pb2.ListWebPage()
        webpage = decloak_pb2.WebPage()
        webpage.URL = browser.current_url
        webpage.body = browser.page_source
        test.WebPages.extend([webpage])
        result = stub.isCloaked(test)
        logging.info("URL: %s, isCloaked: %r, response: %s, Error : %d" % (url,
                     result.cloaked, result.response, result.Err))
        browser.quit()
        return result
    except Exception as E:
        print E
        browser.quit()


def main():
    # Run test for top N sites
    domain_re = re.compile("[a-zA-Z0-9\-]{1,61}\.[a-zA-Z]{2,6}")
    with open(config.get("evaluation", "top_sites_file"),"r") as f:
        required_count = config.getint("evaluation", "top_sites_count")
        initial_count = 0
        try:
            rank_list = f.readlines()
            for each_line in rank_list:
                m = domain_re.search(each_line)
                if m:
                    url = "http://" + m.group()
                    logging.info("Start: URL: %s" % url)
                    print get_cloak_info(url)
                    logging.info("End: URL %s" % url)
                    initial_count += 1
                    if initial_count >= required_count:
                        break
        except Exception as E:
            print E


if __name__ == '__main__':
    main()


