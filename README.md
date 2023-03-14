# Networker
Get Past Small Talk - Your AI-Powered Networking Assistant

## Basic Summary
OpenAI has impressed the world with ChatGPT. Networker is an AI-powered tool that aims to help you overcome the barrier of small talk when networking. By helping you remember important details about people, it aims to facilitate more meaningful conversations and build deeper connections. It is the combination of OpenAI's text prompting algorithm da-vinci, combined with both Speechly and Google APIs. 

## Project Outcome
Once the Speech to text funcitonality is flushed out, we'll want to have the following features:
- Networking Assistant: Networker will take any data gathered from a conversation you've had and log it, including important details as well as important facts about the person/people you've interacted with, stored in a JSON format in a MongoDB database.
- Inquiry Assistant: Networker will gather information on you by asking rich, meaningful questions to get to know you, your connections, and help you to inquire more about life, acting as both an assistant and personal coach.

### 3/14/2023: Networker Tutorial [is here!](https://www.youtube.com/watch?v=VqBEqaqCqEY) 

### Latest deployment is held on Railway and [can be found here](https://networker.up.railway.app/)

1. Add: This trigger is used to add a new object to the system. For example, if you say "Add person", the system should create a new person object and add it to the database.

2. Update: This trigger is used to update an existing object in the system. For example, if you say "Update person", the system should prompt you for the details to be updated and then update the person object in the database.

3. Delete: This trigger is used to delete an existing object from the system. For example, if you say "Delete person", the system should prompt you to confirm the deletion and then delete the person object from the database.

4. Info: This trigger is used to retrieve information about an object from the system. For example, if you say "Info person", the system should return information about the person object from the database.

5. Edit: This trigger is used to edit an existing object in the system. For example, if you say "Edit person", the system should prompt you for the details to be edited and then edit the person object in the database.

6. Note: This trigger is used to add a note to an existing object in the system. For example, if you say "Note person", the system should prompt you for the note text and then add the note to the person object in the database.

7. Record: This trigger is used to record an event related to an object in the system. For example, if you say "Record person", the system should prompt you for the event details and then create a new event object related to the person object in the database.

8. Set: This trigger is used to set an event for an object in the system. For example, if you say "Set event", the system should prompt you for the event details and then create a new event object in the database.

9. This is wrong: This trigger is used to correct the system when it provides an incorrect response. For example, if the system responds incorrectly to a command, you can say "This is wrong" and then provide the correct response.

10. Mute: This trigger is used to mute a person in the system. For example, if you say "Mute person", the system should mute the person's audio input.

11. Feedback: This trigger is used to leave feedback for the system. For example, if you say "Feedback", the system should prompt you for feedback and then store it in the database.

12. Go To: This trigger is used to navigate to a specific page in the system. For example, if you say "Go to page", the system should navigate to the specified page.



Py Scripts: 
- App
  - Central Application, made using TKinter for a GUI
- Prompt
  - OpenAI's API script, pulling the text data and submitting a response.
- STT (Speech to text)
  - Using Google Cloud's speech to text API, voice data is recognized as text for input in app.py. 
- TTS (Text to Speech)
  - Using Google Cloud's text to speech API, we can gather text and output speech here.
- conversation.js
  - Holds prior conversation data.

Autorization Scripts (not added to GH):
- creds.py - holds API Keys in a Python format
- google.json - holds google authorization payload

![Networker Demo](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*1vw8y19iIVxi4UXhwbKLhA.png)
<h2>How to Use the App</h2>
      <p><ol><li>Push the microphone, spacebar to speak or enter into the prompt manually.</li>
          <li>For your prompt, the first word you ask is important. Use the following as a guide:</li>
        <ul><li><b>Update Strings</b> = "update",'edit', 'modify': This is a general "Upsert" function that will add fields to an existing user, or build out a new one. <br>Example Prompt: "Update Drew Piispanen - he likes vanilla ice cream." <br>Example Response: "Drew Piispanen has been updated"</li>
      <li><b>General Strings</b> = 'who': This asks Networker to give general information about a person. <br>Example Prompt: "Who's Drew Piispanen?"<br>Example Response: "Drew Piispanen lives in Hershey, PA. He is studying data science, and is coding the 'Networker Application'. His favorite ice cream is cookie dough."</li>
      <li><b>Reminder Strings</b> = 'remind': This will ask Networker to remind them about a specific field of this person. <br>Example Prompt: "Remind me, what's Drew Piispanen's favorite ice cream flavor?" <br>Example Response: "Drew's favorite ice cream flavor is cookie dough."</li></ul>
      <li>Networker will respond with in the response textfield, to which the following prompt can audit the last response.</li>
      </ol></p>


Setbacks
- Logic loops
- High payload to request memory and/or formatting
- Historical data not easily found.

Needs: 
- Better name identification
- CRM backend application 
- Connection Function:
 
<br><br>
For more information, see our [Medium Post](https://medium.com/@andrewpiispanen/the-networker-project-cc8765c25f50).
<br><br>
Questions? Reach out to me:<br>
apiispanen@berkeley.edu<br>
Drew Piispanen