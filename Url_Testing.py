import time, random
from duckduckgo_search import DDGS

def fetch_top_url(query: str, site: str = None, retries: int = 3):
    if site:
        query = f"{query} site:{site}"

    for attempt in range(retries):
        try:
            with DDGS() as ddgs:
                results = ddgs.text(query, max_results=1)
                for r in results:
                    return r["href"]
        except Exception as e:
            print(f"Attempt {attempt+1} failed: {e}")
            time.sleep(random.randint(3, 7))  # wait a bit before retry

    return None

print(fetch_top_url("child screen timing"))
print(fetch_top_url("child screen timing", "unicef.org"))
