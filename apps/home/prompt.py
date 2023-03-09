import requests
import os
API_KEY = os.getenv('API_KEY')

if API_KEY is not None: 
    print('The API key is found')
    try:
        from creds import API_KEY
        from user import person
    except:
        from apps.home.user import person
        
else:
    print('The API_KEY environment variable is not set. Trying from apps.home')
    from apps.home.creds import API_KEY
    from apps.home.user import person
        

from flask import session
import openai
import json

openai.api_key = API_KEY

def ai_response(prompt, networking = None, previous_conversation=None, temperature =.5):
    import string

    # OPEN AI CONFIG
    temperature = temperature
    model_engine = "text-davinci-003"
    # model_engine = "gpt-3.5-turbo"

    # LOAD IN THE UPDATE/REMINDER STRINGS
    update_strings = ["update",'edit', 'modify']
    general_strings = [ 'who']
    reminder_strings = ['remind']
    log_strings = ["spoke", 'talked']

    if networking:
        human = person() 
        first_word = prompt.split()[0].lower().translate(str.maketrans("", "", string.punctuation)).splitlines()[0]

        inquire_prompt = "Based on the below prompt, what is this person's full name who we are talking about?\n\n'"+prompt+"'\n\nAnswer in as few characters as possible."
        name = ai_response(inquire_prompt, networking=False, temperature=0).replace('\n',' ')
        human.name  = name.translate(str.maketrans("", "", string.punctuation))
        verified = human.verify()
        print(f"NAME VERIFIED: {str(verified)} {human.name}")
        # If not a human in our DB:
        if not verified:
            pass

        if first_word in update_strings + general_strings + reminder_strings:
            prompt = prompt.replace(name, human.name)
            temperature = 0
            if first_word in update_strings:
                print("*** UPDATING USER ***")
                prompt = """Pretend you are my assistant, building a JSON file called "People" that is in the following rough format (comments in "[]"):\n\n {"People": {"[PERSONS NAME]": {"School": "[SCHOOL]","Location": "[LOCATION]","Interests":"[INTEREST]", "Fun Facts":"[FUN FACTS]", "[OTHER RELEVANT FIELD NAME]":"[OTHER DATA]" }}}  \n\nBased on this design, what fields and keys would you make out of the following dialog:""" + prompt+"\n\nAnswer in JSON only, and with facts you are certain about. Do not respond with null fields, and only add new fields as necessary."

            elif first_word in general_strings:
                print("*** RETRIEVING USER ***")
                # What can you tell me about 
                human_info = human.get_info()
                print(f"getting info for {human.name}:\n{human_info}")
                # print("DATABASE (json_pull) RESPONSE",human_info)
                
                # # LinkedIn stuff, feel free to delete:
                # linked_in = ''
                # if "linkedin" in prompt or 'linked in' in prompt:
                #     print("LINKEDIN FOUND")
                #     linked_in = " and here is their LinkedIn info: \n"+ google_it(name)

                # keys =  ['School', 'Location', 'Company']
                # try:
                #     relevant_info = [human_info[key] for key in human_info.keys() if key in keys] 
                # except:
                #     relevant_info = []
                # if len(relevant_info)>0:
                #     print("relevant info: ", relevant_info)
                # else:
                #     relevant_info = None
                # # END LINKEDIN STUFF

                prompt = f"Pretend you're an assistant for me. Based on their json file data below, can you briefly summarize this person?\n{human_info}"
            
            elif first_word in reminder_strings:
                # IDENTIFY FIELD OF INTEREST
                human_info = human.get_info()
                print(f"getting info for {human.name}:\n{human_info}")
                prompt = f"Based on the user's json file below, {prompt}\n\n{human_info}"

            # if first_word in ask_strings:
            #     print("*** RETRIEVING USER ***")
            #     ai_response(f"What can you tell me about {human.name} based on the following?\n\n{human.get_info()}")

    for string in log_strings:
        if string in prompt:
            prompt = f"Pretend you are a scribe trying to summarize a meeting. Can you take professional, bulleted notes on the following? If they need a follow up, write 'Follow up: TRUE' and specify timeframe.\n{prompt}"

    # NOW RUN THE PROMPT:
    completions = openai.Completion.create(
        engine=model_engine,
        prompt=prompt,
        max_tokens=200,
        n=1,
        stop=None,
        temperature=temperature,
        frequency_penalty=1
    )

    message = completions.choices[0].text
    # print(f"Prompt:{prompt}")
    # print("AI Response:", message)
    if networking and first_word in update_strings:
        print("to feed into json_update:\n",human.name, message)
        human.json = message.strip()
        human.update()
        message = str(human.name)+" has been updated."
        print("******** JSON UPDATED ********")    

    return message.strip()


# postmeeting = "Just spoke with Zach. Seems like he's ready to go with our software demo but needs approval from his boss. He was interested in the low price, and wanted to learn more about the drag and drop editor. I'd like to follow up with him in a week to make sure he does that."

# ai_response(postmeeting)



# prompt = 'update robert piispanen - he works at carlson fabrication solution, is a business owner and has a dog named stella. On the weekends, he likes to go swimming at the lake.'

# """I'm writing a script that will log relevant information about a person. Can you highlight the conversation below with the following format?
# - Person 
# - Occupation (if applicable)
# - Company (if applicable)
# - Interesting facts (if applicable)

# Conversation below:
# "I just met Sam Casey who is an engineer designing his own app with ChatGPT. He currently works with a company called Mercury who does NFT development, which is very interesting. he gave me his email, but I can't read it. I also found that we share the name college - both of us went to Babson. He'll be back in San Francisco in a few months, so maybe I can meet with him then."
# """
# prompt=""" something here """
# conversation = ai_response(prompt, previous_conversation=load_conversation())

# print(conversation)

# save_conversation(prompt, conversation)

# messages = {f'You are ChatGPT, a large language model trained by OpenAI. Answer as concisely as possible. Knowledge cutoff: {knowledge_cutoff} Current date: {current_date}'}
messages=''
def gpt_response(prompt, messages = messages):
    response = openai.ChatCompletion.create( 
    openai.api_key,
    model="gpt-3.5-turbo-0301",
    messages=[{"role": "user", "content": prompt}],
    max_tokens=1024,
    n=1,
    temperature=0.5)
    message = response["choices"][0]["message"]["content"]
    # Requires ChatGPT
    # message = response["choices"]
    return message

# print(gpt_response("do you know what the best dance move is?"))


# py -m pip install openai --upgrade
# TO REVERT:
# py m- pip install --force-reinstall -v "openai==0.26.4"