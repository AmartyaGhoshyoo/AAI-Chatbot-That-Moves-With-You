from dotenv import load_dotenv
import os
# FIRECRAWL_API_KEY="fc-ec73eb1678be49b8a4d19ad696818c74"
from crewai import Agent,Crew,Task,LLM
# from crewai_tools import SerperDevTool
from crewai_tools import (FirecrawlSearchTool,SerperDevTool)

from Agent_Talking import url_fetcher

tool = FirecrawlSearchTool(api_key="fc-ec73eb1678be49b8a4d19ad696818c74",config={"limit": 5})
result=tool.run(query="Find me relevant blogs on child screen timing from parentune ")
print(result)
url_fetcher=FirecrawlSearchTool(api_key="fc-ec73eb1678be49b8a4d19ad696818c74",config={"limit": 5})
web_search=SerperDevTool()
# url_fetcher_agent=Agent(
#     goal:'Crawl through web'
# )
url_fetcher_agent=Agent(
    role="Fetching websites urls"
    goal="Crawl the websites relevant to the ueser query",
    backstory="You are an web crawler which always find the most relevant urls and it's content based on the user's query",
    verbose=True,
    tools=[url_fetcher]
)
verify_agent=Agent(
    role="Verifier for urls",
    goal='You need to check the urls output from the url_fetcher_agent that which one is more relevant to the ueser query',
    backstory="You could match the query and output of the previous agent to very urls "
)
