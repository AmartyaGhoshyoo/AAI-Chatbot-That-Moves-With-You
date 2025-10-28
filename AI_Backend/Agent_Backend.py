from openai import OpenAI
from pydantic import BaseModel
from pydantic import BaseModel, Field
from crewai.tools import BaseTool
from firecrawl_search_tool_modified import FirecrawlSearchTool
import json
from typing import Type
import os 
from firecrawl import Firecrawl
from dotenv import load_dotenv
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv("OPENAI_API_KEY")
client = OpenAI()
history=[]
import datetime
now = datetime.datetime.now()
from crewai import Agent,Crew,Task,LLM
from embedchain import App

llm=LLM(model='gpt-4.1')
class VerifiedURL(BaseModel):
    best_url: str
    description:str
    
firecrawl = Firecrawl(api_key="fc-ec73eb1678be49b8a4d19ad696818c74")
url_fetcher_tool=FirecrawlSearchTool(api_key="fc-ec73eb1678be49b8a4d19ad696818c74",limit= 2)
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
            'dir': 'AI_Blog_Urls',

        }
    },
}
app=App.from_config(config=config)
def fetch_url_internal(query:str):
    result=app.query(f"Only return the 'url' and 'description' based on the user query which is '{query}'")
    return result

tool = FirecrawlSearchTool()
def web_search(query: str):
    """
   Crawl websites with given search query using FirecrawlScrapeWebsiteTool.
    """
    tool = FirecrawlSearchTool(api_key="fc-ec73eb1678be49b8a4d19ad696818c74",limit=2)
    result=tool.run(query)
    print(result)
    data = [{"url": item.url,"title": item.title} for item in result.web]        
    return str(data)

def webcontent(url:str):
    """
    Scrapes the given URL using FirecrawlScrapeWebsiteTool.
    """    
    doc = firecrawl.scrape(url, formats=["markdown", "html"])
    return doc.markdown

def run_agent_query_backend(user_query: str, current_url: str = None) -> str:
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
    print(f'Bot_MAIN: {assistant_message}')
    if choice.finish_reason == "tool_calls":
        for tool_call in choice.message.tool_calls:
            tool_name = tool_call.function.name
            tool_args = tool_call.function.arguments
            args = json.loads(tool_args)
        if tool_name=='internal_search':
            inputs=[]
            internal_query=args.get('query',"")
            result=fetch_url_internal(internal_query)
            print(f'BOT_RESULT_INTENAL_SEARCH_TOOL: {result}')
            print(f'Type of the result {type(result)}')
    
            inputs.append({
        "type": "function_call_output",
        "output": str(result)
    })
            new_response=client.responses.parse(
                        model="gpt-4.1",
                        instructions="""
                        You are guiding the user through different pages.
                        For each page:
                        1. Start with a short line saying that you have brought them to this page.
                        2. Provide a concise description of what this page is about (in simple words).
                        3. Offer help by saying: 'If you need any clarification or help in understanding something from here, I will assist you.'
                        4. If `No relevant results found` or similar then take the user to `http://localhost:3000/` which is the homepage, in description write the inconveniences for that and let the user know that you take them to the home page
                        Keep the description short, clear, and user-friendly.
                        """,
                        input=result,
                        text_format=VerifiedURL
                    )
            print(f'BOT_INTERNAL_SEARCH_RESPONSE: {new_response.output_text}')
            history.append({"role":'assistant','content':f"Generated response at {now} {new_response.output_parsed.description}"})
            return new_response.output_text
# -------------------------------
# CrewAI option Starts
# -------------------------------            
        # if tool_name=='decider':
        #     decider_query=args.get('query',"")
        #     result=crew.kickoff(inputs={'query':decider_query})
        #     print(f'Bot: {result.raw}')
        #     parsed_result=json.loads(result.raw)
        #     history.append({"role":'assistant','content':f"Generated response at {now} {parsed_result['description']}"})
        #     return result.raw
# -------------------------------
# CrewAI option Ends
# -------------------------------       
        
        if tool_name=='decider':
            internal_query=args.get('query',"")
            result=web_search(internal_query)
            print(f'BOT_DECIDIER_TOOL: {result}')
            print(f'Type of the result {type(result)}')
            new_response=client.responses.parse(
                        model="gpt-4.1",
                        instructions="""
                        You are guiding the user through different pages.
                        For each page:
                        1. Start with a short line saying that you have brought them to this page.
                        2. Provide a concise description of what this page is about (in simple words).
                        3. Offer help by saying: 'If you need any clarification or help in understanding something from here, I will assist you.'
                        4. If `No relevant results found` or similar then take the user to `http://localhost:3000/` which is the homepage, in description write the inconveniences for that and let the user know that you take them to the home page
                        Keep the description short, clear, and user-friendly.
                        Also for
                        "You are a strict evaluator of search results. "
                        "You carefully compare the query with the candidate URLs and their snippets, "
                        "and always select the one that best matches the user's intent."
                        """,
                        input=result,
                        text_format=VerifiedURL
                    )
            print(f'BOT_DECIDIER_RESPONSE: {new_response.output_text}')
            history.append({"role":'assistant','content':f"Generated response at {now} {new_response.output_parsed.description}"})
            return new_response.output_text        
        if tool_name=='web_search':
            inputs=[]
            searching=args.get('url',"")
            result=webcontent(searching)
            print(f"BOT WEB SEARCH RESULT {result}")
            inputs.append({"role":'assistant','content':f"Generated response at {now} {result}"})
            history.append({"role":'system','content':f"Generated response at {now} You have the content {result} on {searching} now you can answer"})
            inputs.append({"role":"user","content":f'User asked at {now}: {user_query}'})

            new_response=client.responses.parse(
                        model="gpt-4.1",
                        instructions="""
                        You are guiding the user through different pages.
                        now user has asked query on particular page and you already have the content now you have the guide the user
                        """,
                        input=inputs
                    )
            print(f'BOT_WEB_SEARCH_RESPONSE: {new_response.output_text}')
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
            result = run_agent_query_backend(query)
            print(f'Bot: {result}')
        else:
            break