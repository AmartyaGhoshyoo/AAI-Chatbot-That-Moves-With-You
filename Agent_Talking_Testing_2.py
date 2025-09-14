from openai import OpenAI
from pydantic import BaseModel
from pydantic import BaseModel, Field
from crewai.tools import BaseTool
import json
import webbrowser
from typing import Type
from datetime import datetime
import os 
from dotenv import load_dotenv
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv("OPENAI_API_KEY")
client = OpenAI()
history=[]
import datetime

# Current date and time
now = datetime.datetime.now()
print("Now:", now)


import os
from dotenv import load_dotenv
from crewai import Agent,Crew,Task,LLM
from rich.console import Console
from rich.markdown import Markdown 
from embedchain import App
load_dotenv()
from crewai.memory.external.external_memory import ExternalMemory

os.makedirs('AI_Memory_Storage',exist_ok=True)
os.environ["CREWAI_STORAGE_DIR"] = "/Users/amartyaghosh/Downloads/OpenaAI Hackathon/AI_Memory_Storage"

# class MyCustomTool(BaseTool):
#     name: str = "Name of my tool"
#     description: str = "What this tool does. It's vital for effective utilization."
#     args_schema: Type[BaseModel] = WebPageOpenToolInput

#     def _run(self, argument: str) -> str:
#         # Your tool's logic here
#         return "Tool's result"
class UrlFetchToolInput(BaseModel):
    """Input schema for MyCustomTool."""
    query: str = Field(..., description="Mandatory search query you want to use for searching the URL")
class URLFetcher(BaseTool):
    name: str = "url_fetcher"
    description: str = (
    "Use this tool to **search and retrieve the most relevant blog URL** "
    "from a curated vector database. Provide a mandatory search query as input, "
    "and the tool will return the best matching blog link. Always use this tool "
    "whenever the user requests a blog, article, or resource URL. or some article to read"
)
    args_schema: Type[BaseModel] = UrlFetchToolInput
    def _run(self,query:str)->str:
        
        config = {
            "llm": {
                "provider": "openai",
                "config": {
                    "model": "gpt-4.1"
                }
            },
            "embedder": {
                "provider": "openai",
                "config": {
                    "model": "text-embedding-3-small"
                }
            },
            'chunker': {
                'chunk_size': 2000,
            },
            'vectordb': {
                'provider': 'chroma',
                'config': {
                    'collection_name': 'full-stack-app',
                    'dir': 'Blog_URLS',
                    'allow_reset': True
                }
            },
        }
        app=App.from_config(config=config)
        result=app.query(f'fetch the most relevant url of {query}')
        return result
    
class WebPageOpenToolInput(BaseModel):
    """Input schema for MyCustomTool."""
    url: str = Field(..., description="Mandatory URL for opening the url")
class WebpageOpen(BaseTool):
    name:str='webpage_openner'
    description:str="This is used to open the fetched url"
    args_schema: Type[BaseModel] = WebPageOpenToolInput
    def _run(self,url:str):
        return url
        

# url_fetcher=URLFetcher()
# webpage_opener=WebpageOpen()

    

# llm=LLM(model="gpt-4.1")
# # Talking = Agent(
# #     role="Conversational AI Agent",
# #     goal=(
# #         "Engage users in natural, context-aware, and human-like conversations, "
# #         "while adapting tone and depth based on user intent (casual chat, "
# #         "knowledge queries, or guidance). Ensure responses are helpful, "
# #         "empathetic, and maintain clarity across diverse topics."
# #         "You also have the access to the memory for the past conversations"
# #     ),
# #     backstory=(
# #         "The agent is designed as a skilled conversational partner, trained "
# #         "to handle large volumes of user interactions simultaneously in "
# #         "a production environment. It has expertise in natural language "
# #         "understanding, contextual memory management, and adaptive dialogue. "
# #         "It balances informative responses with engaging communication, "
# #         "ensuring conversations remain coherent, concise, and user-focused. "
# #         "It is resilient to ambiguous inputs, gracefully handles errors, "
# #         "and scales effectively to thousands of concurrent users."
# #     ),
# #     constraints=[
# #         "Maintain a friendly, approachable, and professional tone.",
# #         "Avoid hallucination—admit uncertainty when knowledge is limited.",
# #         "Respond within 2–3 seconds to maintain real-time feel.",
# #         "Ensure scalability: responses must be lightweight and efficient.",
# #         "Comply with ethical and safety guidelines at all times."
# #     ],
# #     verbose=True,
# #     allow_delegation=False,# you can later add web search, db connectors, APIs, etc.
# #     memory=True,
# #     llm=llm
# # )

# Fetcher = Agent(
#     role="Intelligent Blog URL Fetcher",
#     goal=(
#         "Retrieve the most relevant blog URL from the vector database "
#         "based on user queries. Always prioritize accuracy and clarity. "
#         "When a query is received: first use URL_Fetcher to search the database, "
#         "then if a suitable URL is found, use Webpage_Opener to fetch and present it."
#         "Do not made up if you can't find relevant url"
#     ),
#     backstory=(
#         "You are an expert at locating high-quality blog content from a curated "
#         "vector database. You specialize in understanding user intent, extracting "
#         "the right URL, and ensuring users get the most relevant resource. "
#         "You follow a strict workflow: (1) Search via URL_Fetcher, "
#         "(2) Extract and validate the URL, (3) Use Webpage_Opener to display the content."
#     ),
#     llm=llm,
#     tools=[url_fetcher, webpage_opener],
#     verbose=True,
    
    
    
# )


# # Task for Fetcher Agent
# fetch_blog_task = Task(
#     description=(
#         "Retrieve the most relevant blog URL from the vector database based on the user's query.{query} "
#         "Use url_fetcher to search and Webpage_Opener to open the most relevant URL."
#     ),
#     expected_output="A working blog URL with a brief explanation of its relevance.",
#     agent=Fetcher
# )

# # Manager's hierarchical task

# crew=Crew(
#     agents=[Fetcher],
#     tasks=[fetch_blog_task],
#     verbose=True,
#     memory=True,
# )
    
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

llm=LLM(model='gpt-4.1-mini')
class VerifiedURL(BaseModel):
    best_url: str
    description:str
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
    memory=True,
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
    memory=True,
    llm=llm,
    
)

fetch_urls_task = Task(
    description="Search the web for the top 2 most relevant URLs related to the user's query: {query}.",
    agent=url_fetcher_agent,
    expected_output="A list of URLs with title and snippet.",
)
verify_url_task = Task(
    description=(
        "From the list of candidate URLs provided by the fetcher agent, "
        "choose the single most relevant one that best matches the user's query. that is {query}"
        "You are guiding the user through different pages."
    """For each page
    1. Start with a short line saying that you have brought them to this page.
    2. Provide a concise description of what this page is about (in simple words).
    3. Offer help by saying: 'If you need any clarification or help in understanding something from here, I will assist you.'

    Keep the description short, clear, and user-friendly."""
    ),
    agent=verify_agent,
    expected_output=(
        "A JSON object with the selected best_url and description"
    ),
    context=[fetch_urls_task],
    pydantic_output=VerifiedURL
)
crew=Crew(
    agents=[url_fetcher_agent,verify_agent],
    tasks=[fetch_urls_task,verify_url_task],
    memory=True,
    verbose=True
)
# class CalendarEvent(BaseModel):
#     should_pass: bool =Field(alias="pass")
# while True:
#     query=input('User: ')
#     if query=='exit':
#         break
#     else:
#         history.append({"role":"user","content":query})
#         response = client.responses.parse(
#             model="gpt-4.1",
#             input=[
# {"role": "system", "content": (
#     "You are a classification agent.\n"
#     "Your only job is to decide if the user explicitly wants you to search for a blog related to their query.\n\n"
#     "Output format must strictly be JSON like this:\n"
#     "{ \"pass\": true } or { \"pass\": false }\n\n"
#     "Rules:\n"
#     "- If the user request clearly indicates they want you to search for a blog/article, return {\"pass\": true}.\n"
#     "- Otherwise, return {\"pass\": false}.\n"
#     "- If the user’s query is unrelated or ambiguous, default to {\"pass\": false}."
# )},
#                 *history
#             ],
#             text_format=CalendarEvent
#         )

#         event = response.output_parsed
#         print(f'Bot: {event}')
#         print(event.should_pass)
#         history.append({"role":"assistant","content":str(event.should_pass)})
#         if event.should_pass:
#             result=crew.kickoff(inputs={"topic":query})
#             console=Console()
#             console.print(Markdown(result.raw))
#             print(analyst.llm.model)
client=OpenAI()
tools = [
    {
        "type": "function",
        "function": {
            "name": "decider",
            "description": (
                "Call this tool whenever the user explicitly asks with content or topics "
                "to read a blog, article, news, or says 'take me to the page'. "
                "Otherwise, just keep chatting."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The exact search query to run on the embedding DB."
                    }
                },
                "required": ["query"]
            }
        }
    },
{
    "type": "function",
    "function": {
        "name": "web_search",
        "description": (
            "Use this tool when the user provides a URL or asks to get "
            "information directly from a specific website."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "url": {
                    "type": "string",
                    "description": "The exact website URL to scrape for information."
                }
            },
            "required": ["url"]
        }
    }
},
    {
        "type": "function",
        "function": {
            "name": "internal_search",
            "description": (
                "Use this when the user asks to go to an INTERNAL page of our app (same-origin). "
                "Examples: home page, docs index, specific docs topics, reader page. "
                "Map natural requests like 'take me to docs' or 'open pricing section' to a concrete internal URL."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "Natural-language internal navigation request (e.g., 'open docs', 'go to getting-started')."
                    }
                },
                "required": ["query"]
            }
        }
    }
]
history=[]
inputs=[]
from embedchain import App
config = {
    "llm": {
        "provider": "openai",
        "config": {
            "model": "gpt-4.1-nano"
        }
    },
    "embedder": {
        "provider": "openai",
        "config": {
            "model": "text-embedding-3-small"
        }
    },
    'chunker': {
        'chunk_size': 2000,
    },
    'vectordb': {
        'provider': 'chroma',
        'config': {
            'collection_name': 'full-stack-app',
            'dir': 'AI_Blog_Urls',

        }
    },
}
app=App.from_config(config=config)
def fetch_url_internal(query:str):
    result=app.query(f"Only return the 'url' and 'description' based on the user query which is '{query}'")
    return result

from crewai_tools import FirecrawlScrapeWebsiteTool

# Initialize the scraping tool
tool = FirecrawlScrapeWebsiteTool()

def web_search(url: str):
    """
    Scrapes the given URL using FirecrawlScrapeWebsiteTool.
    """
    result = tool.run(url=url)
    return result.__dict__['markdown']

def run_agent_query(user_query: str, current_url: str = None) -> str:
    history.append({"role":"user","content":f'User asked at {now}: {user_query}'})
    if current_url:
        history.append({"role":"assistant","content":f'User is currently on page: {current_url}. '})
        print(f'Current URL: {current_url}')
    print(f'User: {user_query}')
    response = client.chat.completions.create(
        model="gpt-4.1",
        tools=tools,
        messages=[
            {
                "role": "developer",
                "content": (
                    "You are an Agentic WebPilot system doesn’t just navigate within a website—it "
"intelligently takes you to the exact content you need, whether it’s on the "
"same site or across other websites, all from a simple prompt—while the AI "
"chatbot stays with you to answer any query within that website’s content. "
                    "with access to three tools: `internal_search`, `decider`, and `web_search`.\n\n"
                    "Rules:\n"
                    "- You will ALWAYS have access to the current URL the user is on.\n"
                    "- Use the current URL context ONLY when the user asks questions about the current page content or wants to understand something specific about where they are.\n"
                    "- When user asks about current page content, use `web_search` tool to get information about that URL and provide comprehensive answers.\n"
                    "- Do not call the fucntion more than once if the user is on the same url, you will have the fetched content in the history"
                    "- INTERNAL navigation (within our site, e.g., home, /docs, /docs/[slug]) → call `internal_search`.\n"
                    "- EXTERNAL blog/article/news (take me to a page on the web) → call `decider`.\n"
                    "- If none of the above, continue normal conversation without tools.\n\n"
                    "Additional:\n"
                    "- Never call multiple tools at once.\n"
                    "- If unsure, ask the user to clarify.\n"
                    "- Keep responses friendly and concise.\n"
                    "- When answering about current page, reference the URL context provided.\n"
                )
            },
            *history
        ],
        tool_choice="auto"
    )
    assistant_message = response.choices[0].message.content
    choice = response.choices[0]
    print(f'Bot: {assistant_message}')
    if choice.finish_reason == "tool_calls":
        for tool_call in choice.message.tool_calls:
            tool_name = tool_call.function.name
            tool_args = tool_call.function.arguments
            args = json.loads(tool_args)
        if tool_name=='internal_search':
            inputs=[]
            internal_query=args.get('query',"")
            result=fetch_url_internal(internal_query)
            print(f'Bot: {result}')
    
            inputs.append({
        "type": "function_call_output",
        "output": str(result)
    })
            new_response=client.responses.parse(
                        model="gpt-4.1-mini",
                        instructions="""
                        You are guiding the user through different pages.
                        For each page:
                        1. Start with a short line saying that you have brought them to this page.
                        2. Provide a concise description of what this page is about (in simple words).
                        3. Offer help by saying: 'If you need any clarification or help in understanding something from here, I will assist you.'

                        Keep the description short, clear, and user-friendly.
                        """,
                        input=result,
                        text_format=VerifiedURL
                    )
            print(f'Bot: {new_response.output_text}')
            history.append({"role":'assistant','content':f"Generated response at {now} {new_response.output_parsed.description}"})
            return new_response.output_text
            
        if tool_name=='decider':
            decider_query=args.get('query',"")
            result=crew.kickoff(inputs={'query':decider_query})
            print(f'Bot: {result.raw}')
            parsed_result=json.loads(result.raw)
            history.append({"role":'assistant','content':f"Generated response at {now} {parsed_result['description']}"})
            return result.raw
        if tool_name=='web_search':
            inputs=[]
            searching=args.get('url',"")
            result=web_search(searching)
            inputs.append({"role":'assistant','content':f"Generated response at {now} {result}"})
            history.append({"role":'system','content':f"Generated response at {now} You have the content {result} on {searching} now you can answer"})
            inputs.append({"role":"user","content":f'User asked at {now}: {user_query}'})

            new_response=client.responses.parse(
                        model="gpt-4.1-mini",
                        instructions="""
                        You are guiding the user through different pages.
                        now user has asked query on particular page and you already have the content now you have the guide the user
                        """,
                        input=inputs
                    )
            print(f'Bot: {new_response.output_text}')
            history.append({"role":'assistant','content':f"Generated response at {now} {new_response.output_text}"})
            return new_response.output_text
            
            
            
        else:
            history.append({"role":'assistant','content':f'Generated response at {now} {assistant_message}'})
            return assistant_message or ""
    else:
        history.append({"role":'assistant','content':f'Generated response at {now} {assistant_message}'})
        return assistant_message or ""

if __name__ == "__main__":
    while True:
        query=input('User: ')
        if query!='exit':
            result = run_agent_query(query)
            print(f'Bot: {result}')
        else:
            break