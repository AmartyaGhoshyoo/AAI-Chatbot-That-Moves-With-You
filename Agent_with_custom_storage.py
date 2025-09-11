from ntpath import exists
import os
from dotenv import load_dotenv
from crewai import Agent,Crew,Task,LLM,Process
from rich.console import Console
from rich.markdown import Markdown 

load_dotenv()
from crewai.memory.external.external_memory import ExternalMemory
os.makedirs('my_project_storage',exist_ok=True)
os.environ["CREWAI_STORAGE_DIR"] = "/Users/amartyaghosh/Downloads/OpenaAI Hackathon/my_project_storage"
# shared_storage_config = {
#     "provider": "your_provider",
#     "config": {
#         "collection_name": "shared_knowledge_memory",
#         # other shared settings
#     }
# }
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
llm=LLM(model="gpt-4.1-nano")
analyst=Agent( 
role="Data Analyst",
    goal="Analyze and remember complex data patterns",
    backstory="You could tell anything on data analyzing",
    llm=llm,
    verbose=True,   
)
# analyst_task=Task(
#     description="You are an Data Analyst you have to analyze any data you provided from user query that is --> {topic}",
#     agent=analyst,
#     expected_output="Tell about the data that you were provided to analyze",
#     )
task2 = Task(
    description="Now recall what the user said earlier.",
    agent=analyst,
    expected_output="Repeat exactly what the user said earlier.don't add anything " 
)

crew=Crew(
    agents=[analyst],
    tasks=[task2],
    process=Process.sequential,
    verbose=True,
    memory=True,
)
result=crew.kickoff(inputs={"topic":"I work with what "})
console=Console()
console.print(Markdown(result.raw))
# 🔎 Debug: Inspect stored memory
# crew.tasks=[task2]
# console.print(Markdown(crew.kickoff().raw))

print(crew.memory)
print(analyst.llm.model)
