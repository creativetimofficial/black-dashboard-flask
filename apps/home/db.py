from pymongo import MongoClient
from bson.objectid import ObjectId
import os

from datetime import datetime, date

MONGO_CLIENT = os.getenv('MONGO_CLIENT')

if MONGO_CLIENT is not None:
    # RUNNING ON RAILWAY
    MONGO_CLIENT = os.getenv('MONGO_CLIENT')
else:
    try:
        from creds import MONGO_CLIENT     
    except:
        from apps.home.creds import MONGO_CLIENT
# Connect to the MongoDB instance
client = MongoClient(MONGO_CLIENT)


def get_people(client=client):
    # Pick out the DB we'd like to use.
    db = client.db
    # GET THE PEOPLE COLLECTION (NOT The Document)
    collection = db['people']
    people = collection.find_one({"_id": ObjectId("63fd0087b9b2b4001ccb7c5f")})
    if people == None:
        print("NO OBJECT FOUND")
    # Returns the JSON string of people, as detailed in our example
    # print(people['People'])
    return people

def delete_person(name, client=client):
    db = client.db
    collection = db['people']
    name = str(name)
    result = collection.update_one({"People": {"$exists": True}}, {"$unset": {"People."+name: ""}})
    if result.modified_count == 1:
        print("Successfully deleted " + name + " from the JSON table.")
    else:
        print(name + " not found in the JSON table.")

def update_person(name, json_input, badname='', client=client):
    db =client.db
    collection = db['people']
    name = str(name)
    for key in json_input:
        if json_input[key] != "" and json_input[key]:  
            collection.update_one({"People": {"$exists": True}}, {"$set": {"People."+name+"."+str(key): str(json_input[key])}})
            print(key +" : "+ json_input[key])

    # If doing user-specific DBs, do:
    # collection.insert({"People": {"$exists": True}}, {"$set": {"People."+name+"."+str(key): str(json_input[key])}}) 
    return name+" Updated"


def log_user_response(user, prompt, response, client=client):
    # Connect to MongoDB
    client = MongoClient(MONGO_CLIENT)
    db = client["db"]
    collection = db["user_responses"]
    
    # Check how many entries the user has already submitted today
    today = date.today()
    query = {
        "user": user,
        "timestamp": {"$gte": datetime.combine(today, datetime.min.time()), "$lt": datetime.combine(today, datetime.max.time())}
    }
    num_entries = collection.count_documents(query)
    
    # DAILY LIMIT
    if num_entries >= 100:
        # If the user has already submitted two entries, prevent further submissions
        client.close()
        print("LIMIT REACHED FOR USER ", user)
        return None
    else:
        # If the user has not yet submitted two entries, create a new one
        doc = {
            "user": user,
            "prompt": prompt,
            "response": response,
            "timestamp": datetime.utcnow()
        }
        result = collection.insert_one(doc)
        client.close()
        
        # Return the ID of the inserted document
        return result.inserted_id


# conversation_json = """{   "People":{
#             "John Doe": {
#             "School": "Bunker Hill",
#             "Location": "Boston, MA",
#             "Interests":"Painting",
#             "Fun Facts":"Skiied in the alps" }}}"""


# print(update_person("Sam Casey", conversation_json))

