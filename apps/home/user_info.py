import requests
from bs4 import BeautifulSoup
import json
from apps.home.db import get_people, update_person
import difflib

def google_it(search_term, other_info=None):
    search_term = search_term.replace(' ', '%20')
    if other_info:
        other_info = '%20'.join(other_info)+'%20"linkedin"'
    print(search_term)
    url = f"https://www.google.com/search?q={search_term}%20{other_info}"
    headers = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"}

    response = requests.get(url, headers=headers)
    soup = BeautifulSoup(response.content, "html.parser")

    search_results = soup.find_all("div", class_="g")
    if search_results:
        first_result = search_results[0]
        title = first_result.find("h3").get_text()
        url = first_result.find("a")["href"]
        # print(f"Title: {title}")
        # print(f"URL: {url}")
        return title
    else:
        print("No search results found.")
        return None

# Based on an input string that includes json, clean the string to output the JSON:
def get_json(input_string):
    start_index = input_string.find('{')

    # Find the index of the last '}' character
    end_index = input_string.rfind('}')

    # Extract the JSON portion of the string
    json_string = input_string[start_index:end_index+1]

    # Parse the JSON string into a Python object
    print(json_string)
    data = json.loads(json_string)
    return data

# Based on an input of a name, return the json of this person's info:
def json_pull(name, filename=None):
    # Load the existing data from the file
    if not filename:
        data = get_people()
    else:
        with open(filename, "r") as f:
            data = json.load(f)

    name_list = list(data["People"].keys())
    search_name = name

    closest_match = difflib.get_close_matches(search_name, name_list, n=1, cutoff=.4)
    if closest_match:
        name = closest_match[0]
        print("We are assuming '", search_name, "' is", closest_match[0])
        # print(data["People"][name])
        result = data["People"][name] 
    else:
        print("No match found for", search_name)
        result = {"None given"}
    
    return dict({name:result})

# Based on an input including name & JSON of the conversation, update the appropriate fields in their JSON: 
def json_update(lookupname, json_input, filename=None):
    if not filename:
        data = get_people()
    json_input = get_json(json_input)
    name = lookupname
    # GET THE LIST OF ALREADY EXISTING NAMES IN DB
    name_list = list(data["People"].keys())
    
    # LOOK UP ANY FIRST NAMES THAT MATCH
    try:
        first_name_match = difflib.get_close_matches(lookupname.split(' ')[0],[name.split(' ')[0] for name in name_list], n=1, cutoff=.7)[0]
        # NOW, LOOK AT ANY LAST NAMES THAT MATCH
        last_name_match = difflib.get_close_matches(lookupname.split(' ')[1], [name.split(' ')[1] for name in name_list], n=1, cutoff=.7)[0]
        # COMBINE
        closest_match = first_name_match + ' ' + last_name_match
        print("We are assuming '", lookupname, "' is", closest_match)
        name = closest_match
    except:
        print("No match found for ", name, "Adding new entry with JSON response: ",json_input)
        
    # Write the updated data back to the file
    if filename:
        with open("conversations.json", "w") as f:
            json.dump(data, f, indent=4)

    return update_person(name, json_input['People'][name], badname=lookupname)

def clean_sentence(sentence):
    import requests

    endpoint = "https://grammarbot.p.rapidapi.com/check"
    headers = {
        "X-RapidAPI-Key": "your_api_key",
        "Content-Type": "application/x-www-form-urlencoded"
    }
    params = {
        "language": "en-US",
        "text": sentence
    }
    response = requests.post(endpoint, headers=headers, data=params)
    print(response)
    if response.ok:
        result = response.json()
        corrected_sentence = result["matches"][0]["replacements"][0]["value"]
        print(corrected_sentence)
        return corrected_sentence
    else:
        return sentence
    
# print(clean_sentence('Update Sam casey his favorite food are turkey'))

# conversation_json = """{   "People":{
#             "Brad Shawford": {
#             "School": "James Brown U",
#             "Fondest Memory":"Swimming the English Channel",
#             "Fun Facts":"Knows a thing or two about being incognito" }}}"""

# json_update("Brad Shawford", conversation_json)

#  Sam Casey:

#     School: UC Berkeley
#     Location: San Francisco, CA
#     Interests: Hiking, reading, and spending time with Penny, his dog
#     Fun Facts: I once hiked the entire Pacific Coast Trail!
#     Previous Conversations: We talked about how much we love our dogs """

# json_log(conversation)