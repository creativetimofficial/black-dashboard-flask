import requests

# Define the endpoint URL
endpoint_url = 'http://localhost:5000/speak/hello'

# Define the speech text
speech_text = 'Hello, world!'

# Send a POST request to the endpoint with the speech text as the request body
# response = requests.post(endpoint_url, json={'speech': speech_text})
response = requests.post(endpoint_url)

# Check the response status code
if response.status_code == 200:
    print('Speech sent successfully')
else:
    print('Error sending speech:', response.content)





# import difflib
# from typing import List
# import os
# API_KEY = os.getenv('API_KEY')
# if API_KEY is not None: 
#     print('The API key is found')
# else:
#     try:
#         print('The API_KEY environment variable is not set.')
#         from apps.home.creds import API_KEY
#         from apps.home.user import person, get_people, delete_person, update_person, get_json
#         from apps.home.prompt import ai_response
#     except:
#         from creds import API_KEY
#         from user import person, get_json, get_people, update_person, delete_person
#         from prompt import gpt_response as gpt_it

# from flask import session
# import openai
# import json

# from pymongo import MongoClient
# from bson.objectid import ObjectId
# import os

# from datetime import datetime, date

# MONGO_CLIENT = os.getenv('MONGO_CLIENT')

# if MONGO_CLIENT is not None:
#     # RUNNING ON RAILWAY
#     MONGO_CLIENT = os.getenv('MONGO_CLIENT')
# else:
#     try:
#         from creds import MONGO_CLIENT     
#     except:
#         from apps.home.creds import MONGO_CLIENT

# client = MongoClient(MONGO_CLIENT)

# openai.api_key = API_KEY


# class Data:
#     class Object:
#         def __init__(self) -> None:
#             self.type = '' #This is the type of object, like "person", "user", "product", "note", "meeting", "company"
#             self.name = '' #This is the name
#             pass

#         def verify(self, name):
#             # Does the object of this name exist? Return true if so
#             pass

#         def add(self):
#             if self.verify(name=self.name):
#                 db = client.db
#                 collection = db[self.type]
#                 # people = collection.find_one({"_id": ObjectId("63fd0087b9b2b4001ccb7c5f")})
#                 return collection
#             pass

#         def remove(self, name):
#             if self.verify(name=name):
#                 pass
#             # Verify that the user exists
#             pass

#         def update(self):
#             pass

#         def info(self):
#             pass
    

# human = Data.Object()
# human.name = "Sam Casey"
# human.type = "Person"
# print(human.add())

# # Define the person class
# class Person:
#     def __init__(self, name="", json="", known_people=[]) -> None:
#         self.name = name
#         self.json = json
#         self.known_people = known_people
#         name = name


#     def verify(self):
#         lookupname = self.name.strip().title()
#         if 'name is' in lookupname:
#             lookupname = lookupname.split(' ')[-2:]
#             print("longer response - lookup name is ",lookupname)
#         data = get_people()
#         name_list = list(data["People"].keys())
#         try:
#             closest_match = difflib.get_close_matches(lookupname, name_list, n=2, cutoff=0.4)[0]
#             if closest_match in self.known_people:
#                 response = f"We are assuming you are referring to {closest_match}, is that correct?"
#                 confirm = gpt_it(response)
#                 if 'yes' in confirm.lower():
#                     print(f"You were talking about {closest_match}.")
#                     self.name = closest_match
#                     return True
#                 else:
#                     print("Okay, let's try again.")
#                     return False
#             else:
#                 print(f"We are assuming '{lookupname}' is", closest_match)
#                 self.name = closest_match
#                 return True
#         except:
#             print("No match found for ", self.name, "Will need to add new entry with person.update(): ",self.json)
#             return False

#     def update(self):
#         json_input = get_json(self.json)
#         update_person(self.name, json_input['People'][self.name])

#     def delete(self):
#         print("deleting user - ", self.name)
#         delete_person(self.name)

#     def get_info(self):
#         data = get_people()
#         name_list = list(data["People"].keys())
#         if self.name in name_list:
#             info = data["People"][self.name]
#             self.json = info
#         else:
#             print("No data found  for "+self.name+" - try verifying the user first.")
#             info = None
#         return info
# # Define the conversation class
# class Conversation:
#     def __init__(self) -> None:
#         self.history = []
#         self.context = {}
#         self.session_id = None

#     def interpret(self, prompt: str) -> str:
#         response = gpt_it(prompt)
#         self.history.append((prompt, response))
#         return response

#     def set_context(self, key: str, value: str) -> None:
#         self.context[key] = value

#     def get_context(self, key: str) -> str:
#         return self.context.get(key)

#     def add_person(self, name: str, json: str) -> bool:
#         p = Person(name, json)
#         if p.verify():
#             p.update()
#             self.set_context(name, json)
#             return True
#         else:
#             return False

#     def delete_person(self, name: str) -> None:
#         p = Person(name)
#         p.delete()
#         self.context.pop(name, None)

#     def get_person_info(self, name: str) -> str:
#         p = Person(name)
#         info = p.get_info()
#         if info:
#             self.set_context(name, info)
#             return info
#         else:
#             return "No data found for " + name + " - try verifying the user first."

#     def update_person_info(self, name: str, json: str) -> None:
#         p = Person(name, json)
#         if p.verify():
#             p.update()
#             self.set_context(name, json)
#         else:
#             print("Unable to update person information. Verify the user first.")

#     def get_all_people(self) -> List[str]:
#         data = get_people()
#         return list(data["People"].keys())

#     def get_history(self) -> List[str]:
#         return self.history
    

    
# conversation = Conversation()
# while True:
#     message = input("You: ")
#     response = conversation.interpret(message)
#     if "Add person" in message:
#         name = input("What is the person's name?")
#         json = input("Please enter the person's information in JSON format:")
#         added = conversation.add_person(name, json)
#         if added:
#             print(f"{name} was added to the database.")
#         else:
#             print(f"Unable to add {name} to the database.")
#     elif "Delete person" in message:
#         name = input("What is the name of the person you want to delete?")
#         conversation.delete_person(name)
#         print(f"{name} was deleted from the database.")
#     elif "Get person info" in message:
#         name = input("What is the name of the person you want information about?")
#         info = conversation.get_person_info(name)
#         if info:
#             print(info)
#         else:
#             print(f"No information found for {name}.")
#     elif "Update person info" in message:
#         name = input("What is the name of the person you want to update information for?")
#         json = input("Please enter the updated information in JSON format:")
#         conversation.update_person_info(name, json)
#         print(f"{name}'s information was updated.")
#     elif "Get all people" in message:
#         people = conversation.get_all_people()
#         print("People in database:")
#         for person in people:
#             print(person)
#     elif "Get history" in message:
#         history = conversation.get_history()
#         print("Conversation history:")
#         for prompt, response in history:
#             print(f"You: {prompt}")
#             print(f"Bot: {response}")
#     elif response:
#         print("Bot:", response)
#     if not True:
#         break

