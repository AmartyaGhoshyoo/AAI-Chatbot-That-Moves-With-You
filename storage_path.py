# from crewai.utilities.paths import db_storage_path
# import os
# storage_path=db_storage_path()
# print(f'CrewAI Storage Locations : {storage_path}')
# if os.path.exists(storage_path):
#     print(f'\n Stored Files and Directories')
#     for item in os.listdir(storage_path):
#         item_path=os.path.join(storage_path,item)
#         if os.path.isdir(item_path):
#             print(f"📁 {item}/")
#             if os.path.exists(item_path):
#                 for subitem in os.listdir(item_path):
#                     print(f"   └── {subitem}")
#         else:
#             print(f"📁 {item}/")
# else:
#     print("No CrewAI storage directory found yet.")


    
        
import os
from crewai.utilities.paths import db_storage_path

storage_path = db_storage_path()
print(f"Storage path: {storage_path}")
print(f"Path exists: {os.path.exists(storage_path)}")
print(f"Is writable: {os.access(storage_path, os.W_OK) if os.path.exists(storage_path) else 'Path does not exist'}")

# Create with proper permissions
if not os.path.exists(storage_path):
    os.makedirs(storage_path, mode=0o755, exist_ok=True)
    print(f"Created storage directory: {storage_path}")