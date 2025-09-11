import os
from crewai import Agent, Task, Crew,Process
from humanlayer import HumanLayer
from dotenv import load_dotenv
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')
# 1. Dialogue Agent
dialogue_agent = Agent(role="User Dialogue Agent", goal="Gather info via conversation",backstory="",tools=[],verbose=True)

# 2. Manager Agent
manager_agent = Agent(role="Conversation Manager", goal="Decide when to dispatch worker",backstory="",tools=[],verbose=True)

# 3. Task Agent (worker)
task_agent = Agent(role="Task Executor", goal="Complete the user-requested task",backstory="", tools=[],verbose=True)

# Human confirmation via HumanLayer
hl = HumanLayer()
confirm_tool = hl.human_as_tool()
task_agent.tools.append(confirm_tool)

# Tasks and flow
dialogue_task = Task(description="Have a conversational exchange", agent=dialogue_agent,expected_output="")
manager_task = Task(description="Evaluate conversation and dispatch task agent", agent=manager_agent, context=dialogue_task.output,expected_output="")
execute_task = Task(description="Execute task if confirmed", agent=task_agent, context=manager_task.output,expected_output="")

crew = Crew(agents=[dialogue_agent, manager_agent, task_agent], tasks=[dialogue_task, manager_task, execute_task],process=Process.sequential,verbose=True)
crew.kickoff()
