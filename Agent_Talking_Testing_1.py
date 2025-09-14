from openai import OpenAI
from pydantic import BaseModel
from pydantic import BaseModel, Field
from crewai.tools import BaseTool
import webbrowser
from typing import Type

import os 
from dotenv import load_dotenv
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv("OPENAI_API_KEY")
client = OpenAI()
history=[]



import os
from dotenv import load_dotenv
from crewai import Agent,Crew,Task,LLM
from rich.console import Console
from rich.markdown import Markdown 
from embedchain import App
load_dotenv()
from crewai.memory.external.external_memory import ExternalMemory

os.makedirs('Talking_Storage',exist_ok=True)
os.environ["CREWAI_STORAGE_DIR"] = "/Users/amartyaghosh/Downloads/OpenaAI Hackathon/Talking_Storage"

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
        result=app.query(f'fetch the urk of {query}')
        return result
    
class WebPageOpenToolInput(BaseModel):
    """Input schema for MyCustomTool."""
    url: str = Field(..., description="Mandatory URL for opening the url")
class WebpageOpen(BaseTool):
    name:str='webpage_openner'
    description:str="This is used to open the fetched url"
    args_schema: Type[BaseModel] = WebPageOpenToolInput
    def _run(self,url:str):
       return f'I have opened the url for you now you could read it {webbrowser.open(url)}'
        

url_fetcher=URLFetcher()
webpage_opener=WebpageOpen()

    
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
llm=LLM(model="gpt-4.1")
Talking = Agent(
    role="Conversational AI Agent",
    goal=(
        "Engage users in natural, context-aware, and human-like conversations, "
        "while adapting tone and depth based on user intent (casual chat, "
        "knowledge queries, or guidance). Ensure responses are helpful, "
        "empathetic, and maintain clarity across diverse topics."
        "You also have the access to the memory for the past conversations"
    ),
    backstory=(
        "The agent is designed as a skilled conversational partner, trained "
        "to handle large volumes of user interactions simultaneously in "
        "a production environment. It has expertise in natural language "
        "understanding, contextual memory management, and adaptive dialogue. "
        "It balances informative responses with engaging communication, "
        "ensuring conversations remain coherent, concise, and user-focused. "
        "It is resilient to ambiguous inputs, gracefully handles errors, "
        "and scales effectively to thousands of concurrent users."
    ),
    constraints=[
        "Maintain a friendly, approachable, and professional tone.",
        "Avoid hallucination—admit uncertainty when knowledge is limited.",
        "Respond within 2–3 seconds to maintain real-time feel.",
        "Ensure scalability: responses must be lightweight and efficient.",
        "Comply with ethical and safety guidelines at all times."
    ],
    verbose=True,
    allow_delegation=False,# you can later add web search, db connectors, APIs, etc.
    memory=True,
    llm=llm
)

Fetcher = Agent(
    role="Intelligent Blog URL Fetcher",
    goal=(
        "Retrieve the most relevant blog URL from the vector database "
        "based on user queries. Always prioritize accuracy and clarity. "
        "When a query is received: first use URL_Fetcher to search the database, "
        "then if a suitable URL is found, use Webpage_Opener to fetch and present it."
    ),
    backstory=(
        "You are an expert at locating high-quality blog content from a curated "
        "vector database. You specialize in understanding user intent, extracting "
        "the right URL, and ensuring users get the most relevant resource. "
        "You follow a strict workflow: (1) Search via URL_Fetcher, "
        "(2) Extract and validate the URL, (3) Use Webpage_Opener to display the content."
    ),
    llm=llm,
    tools=[url_fetcher, webpage_opener],
    verbose=True,
    max_iter=5,
    memory=True,
    allow_delegation=False
)
Manager = Agent(
    role="Conversation & Task Orchestrator",
    goal=(
        "Coordinate between specialized agents (Talking and Fetcher) "
        "to fulfill user requests efficiently. Identify the nature of the query "
        "and assign it to the right agent while ensuring smooth flow."
    ),
    backstory=(
        "You are the intelligent manager agent. You act as the brain of the system, "
        "analyzing user queries and deciding which agent to engage. "
        "If the user is asking for general conversation, guidance, or clarification, "
        "delegate to Talking. If the user is seeking blog URLs or external resources, "
        "delegate to Fetcher. You ensure responses are coherent, avoid duplication, "
        "and maintain a seamless experience for the user."
    ),
    llm=llm,
    tools=[],  # Manager doesn’t directly use tools, only delegates
    verbose=True,
    max_iter=10,
    memory=True,
    allow_delegation=True
)
# Task for Talking Agent
conversation_task = Task(
    description=(
        "Engage the user in a natural, context-aware conversation. "
        "Answer queries, clarify doubts, or provide general assistance."
        "Remember that you have the access to the memory"
    ),
    expected_output="A coherent, empathetic, and context-relevant response.",
    agent=Talking
)

# Task for Fetcher Agent
fetch_blog_task = Task(
    description=(
        "Retrieve the most relevant blog URL from the vector database based on the user's query. "
        "Use URL_Fetcher to search and Webpage_Opener to open the most relevant URL."
    ),
    expected_output="A working blog URL with a brief explanation of its relevance.",
    agent=Fetcher
)

# Manager's hierarchical task
manager_task = Task(
    description=(
        "Analyze the user query and decide whether it requires general conversation {query} "
        "You will have the past conversation memory"
        "(Talking agent) or blog URL retrieval (Fetcher agent). "
        "Delegate the task to the correct agent and return the final result to the user."
    ),
    expected_output="A complete and relevant response to the user query.",
    agent=Manager,
    
)

crew=Crew(
    agents=[Manager,Talking,Fetcher],
    tasks=[manager_task,conversation_task,fetch_blog_task],
    verbose=True,
    memory=True,
    manager_llm='gpt-4.1',
    manager_agent=Manager
)
while True:
    query=input('User: ')
    if query!='exit':
        result=crew.kickoff(inputs={'query':query})
        print(f'Bot: {result.raw}')
    else:
        print(f'Thanks for using me!')
        break
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
