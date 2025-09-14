from dotenv import load_dotenv
import os
load_dotenv()
os.environ['OPENAI_API_KEY']=os.getenv('OPENAI_API_KEY')

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
# app.reset()
app.add('urls_merged.csv', data_type='csv')

result=app.query(f"Fetch the url only on user query that is 'take me to the quickstart'")
print(result)