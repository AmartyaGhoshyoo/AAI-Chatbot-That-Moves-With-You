import os
# Replace this with your HF token
from dotenv import load_dotenv
load_dotenv()
from embedchain import App


os.environ['OPENAI_API_KEY']=os.getenv("OPENAI_API_KEY")

# config = {
#   'llm': {
#     'provider': 'openai',
#     'config': {
#       'model': 'gpt-4.1-nano',
#       'top_p': 0.5
#     }
#   },
#   'embedder': {
#     'provider': 'openai',
#     'config': {
#       'model': 'text-embedding-3-small'
#     }
#   }
# }
# app = App.from_config(config=config)
# # print(app.from_config())
# app.add("https://www.forbes.com/profile/elon-musk")
# app.add("https://en.wikipedia.org/wiki/Elon_Musk")
# app.query("What is the net worth of Elon Musk today?")
# # Answer: The net worth of Elon Musk today is $258.7 billion.
from embedchain import App


# Print the default config
# print("App Config:", app.config.__dict__)
# print("LLM Config:", app.llm.config.__dict__)

# # Some versions expose embedder and vectordb under app.client
# if hasattr(app, "client"):
#     if hasattr(app.client, "embedder"):
#         print("Embedder Config:", app.client.embedder.config.__dict__)
#     if hasattr(app.client, "vectordb"):
#         print("VectorDB Config:", app.client.vectordb.config.__dict__)
app = App()

# app.add('https://www.parentune.com/news-sitemap.xml', data_type='sitemap')
# app = App()
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
            'dir': 'Blog_URLS',
            'allow_reset': True
        }
    },
}
import json
# Add json file
# with open('Blog_urls.json') as f:
#     data=json.load(f)

app = App.from_config(config=config)


# for i,entry in enumerate(data):
#     app.add(entry['url'],data_type='text')
#     if i==10:
#         break
result=app.query("child screen timing blog")
print(result)
# app.add("temp.json")
# config = {
#     "llm": {
#         "provider": "openai",
#         "config": {
#             "model": "gpt-4.1-nano"
#         }
#     },
#     "embedder": {
#         "provider": "openai",
#         "config": {
#             "model": "text-embedding-3-small"
#         }
#     },
#     'chunker': {
#         'chunk_size': 2000,
#     },
#     'vectordb': {
#         'provider': 'chroma',
#         'config': {
#             'collection_name': 'full-stack-app',
#             'dir': 'Csv',
#             'allow_reset': True
#         }
#     },
# }
# app = App.from_config(config=config)

# # Now add your CSV file

# app.add('three.csv', data_type='csv')

# result=app.query('suggest commic books')
# print(result)