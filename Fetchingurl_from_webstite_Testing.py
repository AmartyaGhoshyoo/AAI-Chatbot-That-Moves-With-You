import requests

url = "https://www.theguradian.com//robots.txt"
resp = requests.get(url)
print(resp.text)


# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import urljoin

# def get_links(base_url):
#     resp = requests.get(base_url)
#     soup = BeautifulSoup(resp.text, "html.parser")
#     links = [urljoin(base_url, a["href"]) for a in soup.find_all("a", href=True)]
#     return set(links)

# urls = get_links("https://parentune.com")
# for u in urls:
#     print(u)

# import requests
# import xml.etree.ElementTree as ET

# url = "https://www.parentune.com/sitemap.xml"
# resp = requests.get(url)
# root = ET.fromstring(resp.content)

# namespaces = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

# sitemaps = [s.text for s in root.findall(".//ns:loc", namespaces)]
# print("Found sitemaps:", sitemaps)
# all_urls = []

# for sm_url in sitemaps:
#     resp = requests.get(sm_url)
#     root = ET.fromstring(resp.content)
#     urls = [loc.text for loc in root.findall(".//ns:loc", namespaces)]
#     all_urls.extend(urls)

# print("Total URLs found:", len(all_urls))
# for u in all_urls[:20]:
#     print(u)
# import requests
# import xml.etree.ElementTree as ET

# sitemap_url = "https://www.parentune.com/blogs.xml"

# resp = requests.get(sitemap_url)
# resp.raise_for_status()

# root = ET.fromstring(resp.content)
# namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

# blog_urls = [loc.text for loc in root.findall(".//ns:loc", namespace)]

# print(f"Found {len(blog_urls)} blog URLs")
# for url in blog_urls[:10]:
#     print(url)


import webbrowser
webbrowser.open("https://www.parentune.com/baby-names")
print(f'Hello')




# import requests
# import xml.etree.ElementTree as ET

# url = "https://www.parentune.com/sitemap.xml"

# headers = {
#     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
#                   "AppleWebKit/537.36 (KHTML, like Gecko) "
#                   "Chrome/120.0.0.0 Safari/537.36"
# }

# resp = requests.get(url, headers=headers)


# # Ensure we actually got XML back
# print("response",resp)
# if resp.status_code != 200:
#     print(f"Error: HTTP {resp.status_code}")
#     print(resp.text[:500])  # show first part of response
#     exit()

# try:
#     print('thissss ',resp)
#     root = ET.fromstring(resp.content)
# except ET.ParseError as e:
#     print("ParseError:", e)
#     print("Response was:")
#     print(resp.text[:500])  # show snippet of what we actually got
#     exit()

# namespaces = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

# sitemaps = [s.text for s in root.findall(".//ns:loc", namespaces)]
# print("Found sitemaps:", sitemaps)

# all_urls = []
# for sm_url in sitemaps:
#     resp = requests.get(sm_url)
#     try:
#         root = ET.fromstring(resp.content)
#     except ET.ParseError:
#         print(f"Skipping non-XML sitemap: {sm_url}")
#         continue
#     urls = [loc.text for loc in root.findall(".//ns:loc", namespaces)]
#     all_urls.extend(urls)

# print("Total URLs found:", len(all_urls))
# for u in all_urls[:20]:
#     print(u)


# import requests
# import xml.etree.ElementTree as ET

# headers = {
#     "User-Agent": (
#         "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
#         "AppleWebKit/537.36 (KHTML, like Gecko) "
#         "Chrome/119.0.0.0 Safari/537.36"
#     )
# }

# sitemap_url = "https://www.parentune.com/blogs.xml"

# resp = requests.get(sitemap_url, headers=headers)
# # print(resp.content)
# resp.raise_for_status()

# root = ET.fromstring(resp.content)
# print(root)
# namespace = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}

# blog_urls = [{'url':loc.text} for loc in root.findall(".//ns:loc", namespace)]

# print(f"Found {len(blog_urls)} blog URLs")
# for url in blog_urls[:10]:
#     print(url)

# import json
# with open('Blog_urls.json','w',encoding='utf-8') as f:
#     json.dump(blog_urls,f,indent=4,ensure_ascii=False)
# print("Saved blog URLs to blog_urls.json")


