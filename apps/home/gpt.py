import os
import re
import openai

# Setting the API key to use the OpenAI API
API_KEY = os.getenv('API_KEY')

if API_KEY is not None: 
    print('The API key is found')
else:
    from creds import API_KEY
    print('The API_KEY environment variable is not set.')

openai.api_key = API_KEY


def estimate_tokens(text):
    """
    As per https://openai.com/api/pricing/, prices are per 1,000 tokens. You can think of tokens as pieces of words, where 1,000 tokens is about 750 words. This paragraph is 35 tokens.
    :param text:
    :return:
    """
    return len(text.split()) / 0.75

def reduce_context(context, limit=3000):
    new_size = int(limit / 0.75)
    return " ".join(context.split()[-new_size:]).split('.', 1)[-1]


def write_logs(file_path, payload):
    file = open(file_path, "a")
    file.write(payload)
    file.close()

def CallAPI(prompt):
    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=4000,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
    )
    return response["choices"][0]["text"]

def ChatGPT3(
        # Setting up the logging feature by creating a file with the topic name
        topic="People",  # TODO: change it to your topic name
        log_path='history',
        context="",
        keep_context=True
):
    history_log = log_path + '/' + re.sub('[^0-9a-zA-Z]+', '', topic) + '.log'
    prompt_log = log_path + re.sub('[^0-9a-zA-Z]+', '', topic) + '_prompts.log'
    # Initializing the prompt and context variables

    while True:
        # Prints '>>' to indicate user input is needed
        print(">>")
        # User input for the prompt
        prompt = input()
        # If the user inputs 'exit', the loop breaks
        if prompt == 'exit':
            break
        if estimate_tokens(context) >= 2000 * 0.95:
            print(f"context size exceeded! context\n'''{context}'''")
            print(estimate_tokens(context))
            print(reduce_context(context))
            context = reduce_context(context)
        if estimate_tokens(prompt) >= 2000 * 0.95:
            print(f"context size exceeded! context\n'''{context}'''")
            print(estimate_tokens(prompt))
            print(reduce_context(prompt))
            prompt = reduce_context(prompt)
        # Sends the prompt and context to the OpenAI API
        if keep_context:
            if context != "":
                prompt = "context:" + context + "prompt:" + prompt
        response = CallAPI(prompt)
        # Writes the user's input to the log file
        write_logs(history_log, prompt + '\n')
        write_logs(prompt_log, prompt + '\n')
        # Writes the API's response to the log file
        write_logs(history_log,  response + "\n")
        # Prints the API's response
        print(response + "\n")
        # Adds the prompt and response to the context variable
        context += prompt + "\n"

ChatGPT3()