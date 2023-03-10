# -*- encoding: utf-8 -*-
"""
Copyright (c) 2019 - present AppSeed.us
"""


from apps.home import blueprint
from flask import render_template, request, session
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
            # template = template+('.html')

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

print("************************************ RUNNING ROUTES FILE ************************************")

import os
# from stt import speech_to_text
from apps.home.prompt import ai_response
from apps.home.tts import tts_string, speak
from flask import Flask, request, render_template, jsonify, flash, redirect, url_for
from flask import session
from apps.home.database import get_people, log_user_response, client, update_person, delete_object
from apps.home.user import Session, person
from html import escape

networker = Session()

app = Flask(__name__)
app.config["CACHE_TYPE"] = "null"

# @app.route('/')
# def index():
#     session['respond'] = True
#     return render_template('voice.html')


@blueprint.route('/people')
def people():
    data = get_people()
    it = iter(data['People']).__next__
    # qTerm = request.args.get('s')
    # if not qTerm:    
    #     flash("You did not search for anything")
    #     return redirect(url_for('home_blueprint.people'))
    # elif qTerm:
    #     cleanQuery = escape(qTerm)

    return render_template('home/people.html', data=data, it=it, segment=get_segment(request))

@blueprint.route('/people2')
def people2():
    data = get_people()
    it = iter(data['People']).__next__
    # qTerm = request.args.get('s')
    # if not qTerm:    
    #     flash("You did not search for anything")
    #     return redirect(url_for('home_blueprint.people'))
    # elif qTerm:
    #     cleanQuery = escape(qTerm)

    return render_template('home/people2.html', data=data, it=it, segment=get_segment(request))

# @blueprint.route('/demo')
# def demo():
#     return render_template('home/voice.html')


@blueprint.route("/ask_question", methods=['POST'])
@login_required
def ask_question():
    print("SOMETHING HAPPENING HERE")
    # process the audio data here
    
    # mark the function as called
    session['audio_saved'] = True
    
    # read the audio data from the request body
    prompt = request.json['words']
    networking = request.json['networking'] 
    print("RAW PROMPT FROM JS: ",prompt)
    # IF THERE'S MORE THAN 1 WORD, PROCESS THE REQUEST:

    if len(prompt.split(' ')) > 1:
        print("YOUR PROMPT:", prompt.split(' '),  len(prompt))
        response = ai_response(prompt, networking=networking)
        user_id = session.get("_user_id")
        log_user_response(user_id, prompt, response, type="prompt", client=client)
        print("AI response Completed.")
    # ELSE, REDIRECT
    else:
        response = "How can I help you?"

    audioContent = tts_string(response)
    # do something with the audio data here
    return jsonify({"audioContent": audioContent, "airesponse":response})

@blueprint.route("/prompts")
@login_required
def prompts():
    print("PROMPTS")
    # Connect to MongoDB and query for unique prompts
    db = client["db"]
    collection = db["user_responses"]
    # user_id = 'user123'
    user_id = session.get("_user_id")

    prompts = collection.find({"user": user_id})
 
    qTerm = request.args.get('s')
    if not qTerm:    
        prompts = collection.find({"user": user_id})
        flash("You did not search for anything")
        res="ALL"
        # return redirect(url_for('home_blueprint.prompts'))
    elif qTerm:
        cleanQuery = escape(qTerm)
        # Do a search on the user and the query, case insensitive "i" option
        prompts = collection.find({"user": user_id,'$or':[
                                    {"prompt":{'$regex':cleanQuery, '$options' : 'i'}},
                                    { "response":{'$regex':cleanQuery, '$options' : 'i'}}
                                   ]                        })
        
        res = 'assume it has been searched'
    
    prompts = prompts.sort("timestamp", -1)
    return render_template('home/prompts.html', prompts=prompts, user_id=user_id, res=res, segment=get_segment(request))

@blueprint.route('/speak/<words>', methods=['GET'])
def speak_route(words):
    # Call the speak() function and get the audio file URL and text result
    while True:
        audio_content, text_result = speak(words)

        # Return the audio URL and text result as a JSON object
        return jsonify({
            'audioContent': audio_content,
            'textResult': text_result
        })


@blueprint.route("/notes")
@login_required
def notes():
    # Connect to MongoDB and query for unique prompts
    db = client["db"]
        # Connect to MongoDB and query for unique prompt
    collection = db["user_responses"]
    # prompts = collection.distinct("prompt")
    # user_id = 'user123'
    # print(session)
    user_id = session.get("_user_id")

    prompts = collection.find({"user": user_id})
 
    qTerm = request.args.get('s')
    if not qTerm:    
        prompts = collection.find({"user": user_id, "type":"note"})
        flash("You did not search for anything")
        res="ALL"
        # return redirect(url_for('home_blueprint.prompts'))
    elif qTerm:
        cleanQuery = escape(qTerm)
        # Do a search on the user and the query, case insensitive "i" option
        prompts = collection.find({"user": user_id, "type":"note",
                                   '$or':[
                                    {"prompt":{'$regex':cleanQuery, '$options' : 'i'}},
                                    { "response":{'$regex':cleanQuery, '$options' : 'i'}}
                                   ]
                                   })
        prompts = prompts.sort("timestamp", -1)
        res = 'assume it has been searched'
        # res = dbQuery.fetchall()
    

    return render_template('home/notes.html', prompts=prompts, user_id=user_id, qTerm=qTerm, segment=get_segment(request))


@blueprint.route("/verify_person", methods=['POST'])
@login_required
def verify_person():
    data = request.get_json()
    entity_value = data.get('entityValue')
    # print(f"looking for '{entity_value}'")
    entry = person(name = entity_value)
    entry.verify()
    return jsonify(entry.name)

@blueprint.route("/relevant_fields", methods=['POST'])
@login_required
def relevant_fields():
    data = request.get_json()
    entity_value = data.get('entityValue')
    # entry = person(name = entity_value)
    # result = entry.verify()
    return 

@blueprint.route('/up-person', methods=['POST'])
def up_person():
    name = request.form['name'].strip()
    oldvalue = request.form['oldvalue'].strip()
    # field = request.form['field']
    value = request.form['value'].strip()
    # Format the value into an actual dict, ugh:
    parts = value.split(':')
    key = parts[0].strip()
    try:
        value = parts[1].strip()
        value = {key: value}
    except:
        print(f"REMOVING FIELD: {oldvalue}, value: {value}")
        value = ''
    
    # print(key, value)
    update_person(name, value, oldvalue )
    # ({"People": {"$exists": True}}, {"$set": {"People."+name+"."+str(key): str(json_input[key])}})
    return jsonify(success=True)

@blueprint.route("/new_note", methods=['POST'])
@login_required
def new_note():
    data = request.get_json()
    # NOW GET THE DATA FROM TEXTAREAS #FORM2 and #FORM3
    form3_data = data.get('note')
    form2_data = data.get('person')
    
    # Process the data here...
    
    # Return a JSON response with the processed data
    response_data = {
        'success': True,
        'message': 'Note submitted successfully!',
        'processed_data': {
            'note': form3_data,
            'person': form2_data
        }
    }
    print(f"NOTE: {response_data['processed_data']['note']}")
    print(f"PERSON: {response_data['processed_data']['person']}")

    user_id = session.get("_user_id")
    log_user_response(user_id, response_data['processed_data']['note'], person_of_interest=response_data['processed_data']['person'], type="note")
    return jsonify(response_data)

@blueprint.route('/repurpose',methods=['POST'])
def repurpose():
    data = request.get_json()
    text = data.get('text')
    
    # NEED TO AI REPURPOSE SCRIPT
    prompt = f"Please repurpose and properly format the following note: {text}"
    new_text = ai_response(prompt, networking=False)

    # Return a JSON response with the processed data
    response_data = {
        'success': True,
            'text': new_text
    }
    return jsonify(response_data)


@blueprint.route('/delete/<collection>/<objectID>', methods=['GET','POST'])
@login_required
def delete(collection,objectID):
    print(f"INCOMING POST AT DELETE/{collection}/{objectID}")
    delete_object(collection,objectID)
    # Return a JSON response with the processed data
    response_data = {
        'success': True,
            'text': 'deleted'
    }
    return jsonify(response_data)



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

if __name__ == '__main__':
    app.run()