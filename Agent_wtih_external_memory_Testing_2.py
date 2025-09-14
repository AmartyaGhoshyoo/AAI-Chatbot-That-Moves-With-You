import os
from crewai import Agent, Crew, Process, Task,LLM
from crewai.memory.external.external_memory import ExternalMemory
from dotenv import load_dotenv
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
llm=LLM(model='gpt-4.1-nano')
new_categories = [
    {"lifestyle_management_concerns": "Tracks daily routines, habits, hobbies and interests including cooking, time management and work-life balance"},
    {"seeking_structure": "Documents goals around creating routines, schedules, and organized systems in various life areas"},
    {"personal_information": "Basic information about the user including name, preferences, and personality traits"}
]
os.makedirs('project_storage',exist_ok=True)
os.environ["CREWAI_STORAGE_DIR"] = "/Users/amartyaghosh/Downloads/OpenaAI Hackathon/project_storage"
os.environ["MEM0_API_KEY"] = "m0-sbgpwdvKBugmqrqHX8n9SCAr82iMQsfVwXyhH1pe"
researcher = Agent(
    role="Researcher",
    goal="Find lifestyle tips for healthy routines",
    backstory="You are an assistant that helps users with their daily routines and structure.",
    verbose=True,
    llm=llm
)

# Define a simple task
task = Task(
    description="{topic}",
    agent=researcher,
    expected_output="A structured morning routine with 3-4 activities.",
    llm=llm
)
# Create external memory instance with Mem0 Client
external_memory = ExternalMemory(
    embedder_config={
        "provider": "mem0",
        "config": {
            "user_id": "john",
            # "org_id": "amartya-default-org",        # Optional
            # "project_id": "my_project_id", # Optional
            "api_key": "m0-sbgpwdvKBugmqrqHX8n9SCAr82iMQsfVwXyhH1pe",    # Optional - overrides env var
            "run_id": "my_run_id",        # Optional - for short-term memory
            # "includes": "include1",       # Optional 
            # "excludes": "exclude1",       # Optional
            "infer": True  ,               # Optional defaults to True
            "custom_categories": new_categories  # Optional - custom categories for user memory
        },
    }
)

crew = Crew(
    agents=[researcher],
    tasks=[task],
    # external_memory=external_memory, # Separate from basic memory
    memory=True,
    process=Process.sequential,
    verbose=True
)
while True:
    query=input("User: ")
    if query=='exit':
        break
    else:
        result=crew.kickoff(inputs={"topic":query})
        print(f'Bot: {result.raw}')
        