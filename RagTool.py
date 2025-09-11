from crewai_tools import RagTool
import os
from crewai import Agent, Task, Crew,Process
from humanlayer import HumanLayer
from dotenv import load_dotenv
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
rag_tool=RagTool()
print(rag_tool.config)