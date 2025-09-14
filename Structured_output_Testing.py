import os
from dotenv import load_dotenv
from openai import OpenAI
from pydantic import BaseModel
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv("OPENAI_API_KEY")
client = OpenAI()

class CalendarEvent(BaseModel):
    name: str
    date: str
    participants: list[str]

response = client.responses.parse(
    model="gpt-4.1-mini",
    input=[
        {"role": "system", "content": "Extract the event information."},
        {
            "role": "user",
            "content": "Alice and Bob are going to a science fair on Friday.",
        },
    ],
    text_format=CalendarEvent,
)

import json

print(response.output_text)
result=json.loads(response.output_text)
print(result)
print(result['participants'])
print(type(response.output_text))
event = response.output_parsed.participants
print(event)