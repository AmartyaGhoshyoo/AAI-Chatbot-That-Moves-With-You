from dotenv import load_dotenv
import os
# FIRECRAWL_API_KEY="fc-ec73eb1678be49b8a4d19ad696818c74"
from crewai import Agent,Crew,Task,LLM
# from crewai_tools import SerperDevTool
from crewai_tools import (FirecrawlSearchTool,SerperDevTool)
from pydantic import BaseModel
# tool = FirecrawlSearchTool(api_key="fc-ec73eb1678be49b8a4d19ad696818c74",config={"limit": 5})
# result=tool.run(query="Find me relevant blogs on child screen timing from parentune ")
# print(result)
# web_search=SerperDevTool()
# url_fetcher_agent=Agent(
#     goal:'Crawl through web'
# )
import os 
from dotenv import load_dotenv
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
llm=LLM(model='gpt-4.1-mini')
class VerifiedURL(BaseModel):
    best_url: str
url_fetcher_tool=FirecrawlSearchTool(api_key="fc-ec73eb1678be49b8a4d19ad696818c74",config={"limit": 2})
url_fetcher_agent = Agent(
    role="Web URL Collector",
    goal="Fetch the most relevant URLs for the user's query.",
    backstory=(
        "You are an expert at searching the web. "
        "You find the top trustworthy, relevant, and clean URLs for any given user query. "
        "You avoid irrelevant pages, advertisements, or duplicates."
        "Do not used this tool more than twice , minimum once for searching"
    ),
    verbose=True,
    llm=llm,
    tools=[url_fetcher_tool]
)
verify_agent = Agent(
    role="URL Relevance Verifier",
    goal="Select the single best URL from a candidate list that matches the user's query.",
    backstory=(
        "You are a strict evaluator of search results. "
        "You carefully compare the query with the candidate URLs and their snippets, "
        "and always select the one that best matches the user's intent."
    ),
    verbose=True,
    llm=llm,
    
)

fetch_urls_task = Task(
    description="Search the web for the top 2 most relevant URLs related to the user's query: {topic}.",
    agent=url_fetcher_agent,
    expected_output="A list of URLs with title and snippet.",
)
verify_url_task = Task(
    description=(
        "From the list of candidate URLs provided by the fetcher agent, "
        "choose the single most relevant one that best matches the user's query. that is {topic}"
    ),
    agent=verify_agent,
    expected_output=(
        "A JSON object with the selected best_url"
    ),
    context=[fetch_urls_task],
    pydantic_output=VerifiedURL
)
crew=Crew(
    agents=[url_fetcher_agent,verify_agent],
    tasks=[fetch_urls_task,verify_url_task],
    verbose=True
)
import time
start=time.time()
result=crew.kickoff(
    inputs={'topic':"Fetch the url of the child screen timing"}
)
print(result.raw)
end=time.time()
print(f'Total time taken {end-start}')