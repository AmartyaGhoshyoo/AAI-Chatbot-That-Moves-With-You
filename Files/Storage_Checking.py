import sqlite3

conn = sqlite3.connect("/Users/amartyaghosh/Downloads/OpenaAI Hackathon/Files/short_term/Data_Analyst/chroma.sqlite3")
cursor = conn.cursor()
# /Users/amartyaghosh/Downloads/OpenaAI Hackathon/Files/short_term/Data_Analyst/chroma.sqlite3
# List tables
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
print(cursor.fetchall())

# Preview a table
cursor.execute("SELECT * FROM embedding_fulltext_search_content;")
print(cursor.fetchall())

conn.close()
