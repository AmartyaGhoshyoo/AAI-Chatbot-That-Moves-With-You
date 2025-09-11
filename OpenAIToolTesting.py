from dotenv import load_dotenv
import os
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
from openai import OpenAI
import json
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
                    "dummy": {"type": "string", "description": "Unused placeholder"}
                },
                "required": []
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
while True:
    query=input('User: ')
    if query!='exit':
        history.append({"role":"user","content":query})
        response = client.chat.completions.create(
            model="gpt-4.1-mini",
    tools=tools ,   # merge lists
            messages=[
{
    "role": "developer",
    "content": (
        "You are a conversational assistant with access to two tools: "
        "`pass_fail_decider` and `web_search`.\n\n"

        "### Your rules of behavior:\n"
        "1. **General conversation** → If the user is just chatting (e.g., greetings, casual talk, asking about your capabilities, etc.), "
        "do NOT call any tools. Just respond naturally.\n\n"

        "2. **Blog/article/news requests** → If the user explicitly asks to *read a blog, article, news, or to be taken to a page* about a topic, "
        "you MUST call the `pass_fail_decider` tool. If the user does not provide a topic or context, politely ask them to specify it first.\n\n"

        "3. **Information retrieval** → If the user asks a factual, trending, or knowledge-based question that requires fresh or external information, "
        "you MUST call the `web_search` tool.\n\n"

        "4. **Tool priority** →\n"
        "- Always prefer `pass_fail_decider` when the user wants to be taken to a blog/article/news page.\n"
        "- Use `web_search` only when the user is asking for knowledge or updates not stored in memory.\n"
        "- If neither condition applies, continue normal conversation.\n\n"

        "### Additional guidelines:\n"
        "- Never call both tools at once.\n"
        "- If unsure whether to call a tool, default to natural conversation and ask the user to clarify.\n"
        "- Stay friendly, clear, and conversational at all times."
    )
},
                *history
                
            ],

                        tool_choice="auto"

        )
        result=response.choices[0].message.content
        choice = response.choices[0]
        print(result)
        # print(response)
        if choice.finish_reason == "tool_calls":
            for tool_call in choice.message.tool_calls:
                tool_name = tool_call.function.name
                tool_args = tool_call.function.arguments
                print(f"Tool called: {tool_name}")
                print(f"Arguments: {tool_args}")
            history.append({"role":'assistant','content':"Tool Called"})
        else:
            history.append({"role":'assistant','content':result})


    else:
        break