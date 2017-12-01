from selenium import webdriver
import sys
import argparse


def get_google_results(searchTerm, pages):
    # Navigate to google
    driver = webdriver.Firefox()
    driver.get("http://www.google.com")

    # Execute the search
    page_number = 1
    searchField = driver.find_element_by_name("q")
    searchField.send_keys(searchTerm)
    searchButton = driver.find_element_by_name("btnK")
    searchButton.click()

    # Iterate through pages
    while True:
        try:
            # Gather search results
            results = driver.find_elements_by_css_selector(".r")
            for each in results:
                try:
                    print each.find_element_by_css_selector("a").get_attribute("href")
                except:
                    pass
            if page_number < pages:
                driver.find_element_by_link_text(str(page_number+1)).click()
                page_number += 1
            else:
                break
        except Exception as E:
            raise E
    # Close Browser
    driver.close()


def main():
    pr = argparse.ArgumentParser()
    pr.add_argument("searchTerm", action='store', type=str, nargs='+', help="Query for google search")
    pr.add_argument("--npage", help="Specify No. of pages.", default=1, type=int)
    args = pr.parse_args()
    get_google_results(searchTerm=" ".join(args.searchTerm), pages=args.npage)

if __name__ == '__main__':
    main()
