import requests
import xml.etree.ElementTree as ET

main_url = "https://www.parentune.com/sitemap-index.xml"
resp = requests.get(main_url)
namespaces = {"ns": "http://www.sitemaps.org/schemas/sitemap/0.9"}
root = ET.fromstring(resp.content)

# collect all sitemap URLs
sitemaps = [s.text for s in root.findall(".//ns:loc", namespaces)]

babyname_sitemaps = [
    sm for sm in sitemaps
    if "baby-names" in sm and "pet" not in sm and "coloring" not in sm
]

print(f"🍼 Found {len(babyname_sitemaps)} baby name sitemaps")

all_baby_urls = []

for sm_url in babyname_sitemaps:
    print(f"Fetching baby names from: {sm_url}")
    resp = requests.get(sm_url)
    if resp.status_code != 200:
        print(f"❌ Failed: {sm_url}")
        continue
    if not resp.text.strip().startswith("<?xml"):
        print(f"⚠️ Skipping non-XML: {sm_url}")
        continue
    try:
        root = ET.fromstring(resp.content)
        urls = [loc.text for loc in root.findall(".//ns:loc", namespaces)]
        print(f"✅ Found {len(urls)} names in {sm_url}")
        all_baby_urls.extend(urls)
    except ET.ParseError:
        print(f"❌ Parse error in: {sm_url}")

print("\n🎉 Total baby name URLs found:", len(all_baby_urls))

with open("baby_name_urls.txt", "w") as f:
    for u in all_baby_urls:
        f.write(u + "\n")
