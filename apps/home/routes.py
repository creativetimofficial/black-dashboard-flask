# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""


from apps.home import blueprint
from flask import render_template, request
from flask_login import login_required
from jinja2 import TemplateNotFound


@blueprint.route('/index')
@login_required
def index():

    return render_template('home/index.html', segment='index')


@blueprint.route('/<template>')
@login_required
def route_template(template):

    try:

        if not template.endswith('.html'):
            pass

        # Detect the current page
        segment = get_segment(request)

        # Serve the file (if exists) from app/templates/home/FILE.html
        return render_template("home/" + template, segment=segment)

    except TemplateNotFound:
        return render_template('home/page-404.html'), 404

    except:
        return render_template('home/page-500.html'), 500


# Helper - Extract current page name from request
def get_segment(request):

    try:

        segment = request.path.split('/')[-1]

        if segment == '':
            segment = 'index'

        return segment

    except:
        return None





# DREW NETWORKER

print("************************************ RUNNING MAIN FILE ************************************")

import os
# from stt import speech_to_text
from apps.home.prompt import *
from apps.home.tts import tts_string
from flask import Flask, request, render_template, jsonify
from flask import session
from apps.home.db import get_people, log_user_response, client
from apps.home.user import Session

networker = Session()

app = Flask(__name__)
app.config["CACHE_TYPE"] = "null"

# @app.route('/')
# def index():
#     session['respond'] = True
#     return render_template('voice.html')


@blueprint.route('/about')
def about():
    # with open("conversations.json", "r") as f:
    #     data = json.load(f)
    data = get_people()
    it = iter(data['People']).__next__

    return render_template('home/ui-tables.html', data=data, it=it)


@blueprint.route("/save_audio", methods=['POST'])
@login_required
def save_audio():
    print("SOMETHING HAPPENING HERE")
    # process the audio data here
    
    # mark the function as called
    session['audio_saved'] = True
    # read the audio data from the request body
    prompt = request.json['words']
    print("RAW PROMPT FROM JS: ",prompt)
    # IF THERE'S MORE THAN 1 WORD, PROCESS THE REQUEST:

    if len(prompt.split(' ')) > 1:
        print("YOUR PROMPT:", prompt.split(' '),  len(prompt))
        response = ai_response(prompt, networking=True).strip()
        print("AI response run")
    # ELSE, REDIRECT
    else:
        response = "How can I help you?"

    audioContent = tts_string(response)
    # do something with the audio data here
    return jsonify({"audioContent": audioContent, "airesponse":response})

@blueprint.route("/prompts.html")
@login_required
def prompts():
    # Connect to MongoDB and query for unique prompts
    db = client["db"]
        # Connect to MongoDB and query for unique prompt
    collection = db["user_responses"]
    # prompts = collection.distinct("prompt")
    user_id = 'user123'
    cursor = collection.find({"user": user_id})
 

    return render_template('home/prompts.html', prompts=cursor, user_id=user_id)




# DREW OLD NETWORKER

# # if __name__ == "__main__":
# app.secret_key = 'mysecretkey'
# # app.config['TEMPLATES_AUTO_RELOAD'] = True

# API_KEY = os.getenv('API_KEY')

# if API_KEY is not None:
#     # FOR RUNNING ON RAILWAY
#     print("Running on Railway")
#     app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
# else:
#     # FOR RUNNING ON LOCAL
#     print("Running on Railway")
#     app.run(debug=False, port=int(os.getenv("PORT", default=5000)))
