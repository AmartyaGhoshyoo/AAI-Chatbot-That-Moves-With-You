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
        

url_fetcher=URLFetcher()
webpage_opener=WebpageOpen()

    
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
llm=LLM(model="gpt-4.1")
# Talking = Agent(
#     role="Conversational AI Agent",
#     goal=(
#         "Engage users in natural, context-aware, and human-like conversations, "
#         "while adapting tone and depth based on user intent (casual chat, "
#         "knowledge queries, or guidance). Ensure responses are helpful, "
#         "empathetic, and maintain clarity across diverse topics."
#         "You also have the access to the memory for the past conversations"
#     ),
#     backstory=(
#         "The agent is designed as a skilled conversational partner, trained "
#         "to handle large volumes of user interactions simultaneously in "
#         "a production environment. It has expertise in natural language "
#         "understanding, contextual memory management, and adaptive dialogue. "
#         "It balances informative responses with engaging communication, "
#         "ensuring conversations remain coherent, concise, and user-focused. "
#         "It is resilient to ambiguous inputs, gracefully handles errors, "
#         "and scales effectively to thousands of concurrent users."
#     ),
#     constraints=[
#         "Maintain a friendly, approachable, and professional tone.",
#         "Avoid hallucination—admit uncertainty when knowledge is limited.",
#         "Respond within 2–3 seconds to maintain real-time feel.",
#         "Ensure scalability: responses must be lightweight and efficient.",
#         "Comply with ethical and safety guidelines at all times."
#     ],
#     verbose=True,
#     allow_delegation=False,# you can later add web search, db connectors, APIs, etc.
#     memory=True,
#     llm=llm
# )

Fetcher = Agent(
    role="Intelligent Blog URL Fetcher",
    goal=(
        "Retrieve the most relevant blog URL from the vector database "
        "based on user queries. Always prioritize accuracy and clarity. "
        "When a query is received: first use URL_Fetcher to search the database, "
        "then if a suitable URL is found, use Webpage_Opener to fetch and present it."
        "Do not made up if you can't find relevant url"
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
    
    
    
)


# Task for Fetcher Agent
fetch_blog_task = Task(
    description=(
        "Retrieve the most relevant blog URL from the vector database based on the user's query.{query} "
        "Use url_fetcher to search and Webpage_Opener to open the most relevant URL."
    ),
    expected_output="A working blog URL with a brief explanation of its relevance.",
    agent=Fetcher
)

# Manager's hierarchical task

crew=Crew(
    agents=[Fetcher],
    tasks=[fetch_blog_task],
    verbose=True,
    memory=True,
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
                "Use this tool when the user asks a factual or trending question "
                "that requires retrieving fresh information from the web."
            ),
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The exact search query to run on the web."
                    }
                },
                "required": ["query"]
            }
        }
    }
]
history=[]

def run_agent_query(user_query: str) -> str:
    history.append({"role":"user","content":f'User asked at {now}: {user_query}'})
    print(f'User: {user_query}')
    response = client.chat.completions.create(
        model="gpt-4.1",
        tools=tools,
        messages=[
            {
                "role": "developer",
                "content": (
                    "You are a conversational assistant with access to two tools: "
                    "`decider` and `web_search`.\n\n"
                    "### Your rules of behavior:\n"
                    "1. **General conversation** → If the user is just chatting (e.g., greetings, casual talk, asking about your capabilities, etc.), "
                    "do NOT call any tools. Just respond naturally.\n\n"
                    "2. **Blog/article/news requests** → If the user explicitly asks to *read a blog, article, news, or to be taken to a page* about a topic, "
                    "you MUST call the `decider` tool. If the user does not provide a topic or context, politely ask them to specify it first.\n\n"
                    "3. **Information retrieval** → If the user asks a factual, trending, or knowledge-based question that requires fresh or external information, "
                    "you MUST call the `web_search` tool.\n\n"
                    "4. **Tool priority** →\n"
                    "- Always prefer `decider` when the user wants to be taken to a blog/article/news page.\n"
                    "- Use `web_search` only when the user is asking for knowledge or updates not stored in memory.\n"
                    "- If neither condition applies, continue normal conversation.\n\n"
                    "### Additional guidelines:\n"
                    "- Never call both tools at once.\n"
                    "- If unsure whether to call a tool, default to natural conversation and ask the user to clarify.\n"
                    "- Stay friendly, clear, and conversational at all times.\n"
                    "- You will having past conversations so be sure when user asked , do not recall the tool just because it is in the history"
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
        if tool_name=='decider':
            decider_query=args.get('query',"")
            result=crew.kickoff(inputs={'query':decider_query})
            print(f'Bot: {result.raw}')
            history.append({"role":'assistant','content':f'Generated response at {now} {result.raw}'})
            return result.raw
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