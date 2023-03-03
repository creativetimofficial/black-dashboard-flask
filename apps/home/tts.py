# Google's speech to text API

import requests
import subprocess
import sys

# subprocess.check_call([sys.executable, '-m', 'pip', 'install', 
# 'pygame'])
"""Synthesizes speech from the input string of text or ssml.
Make sure to be working in a virtual environment.

Note: ssml must be well-formed according to:
    https://www.w3.org/TR/speech-synthesis/
"""
from google.cloud import texttospeech_v1beta1 as texttospeech

# import pygame
import base64

import json
# Instantiates a client
import os
try:
    GOOGLE_JSON = json.loads(os.getenv('GOOGLE_JSON'))
    print('The Google Creds are found')
    client = texttospeech.TextToSpeechClient.from_service_account_info(GOOGLE_JSON)
except:
    client = texttospeech.TextToSpeechClient.from_service_account_file('apps/home/google.json')
    print('The Google KEY environment variable is not set. Using google.json')

def tts(text):
    # Set the text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=text)

    # Build the voice request, select the language code ("en-US") and the ssml
    # voice gender ("neutral")
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US", name='en-GB-Standard-A',                                                                                                                                                                 
         ssml_gender=texttospeech.SsmlVoiceGender.FEMALE
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # The response's audio_content is binary.
    with open("temp/output.mp3", "wb") as out:
        # Write the response to the output file.
        out.write(response.audio_content)
        print('Audio content written to file "output.mp3"')
        out.close()


    # NOW PLAY IT BACK

    # pygame.init()
    # pygame.mixer.init()
    # try:
    #     pygame.mixer.music.load("temp/output.mp3")
    #     pygame.mixer.music.play()
    # except:
    #     pygame.mixer.music.load("temp/no.wav")
    #     pygame.mixer.music.play()
    # while pygame.mixer.music.get_busy():
    #     pygame.time.wait(100)
    # pygame.quit()

def tts_string(text):
    # Set the text input to be synthesized
    synthesis_input = texttospeech.SynthesisInput(text=text)

    # Build the voice request
    voice = texttospeech.VoiceSelectionParams(
        language_code="en-US",
        name="en-GB-Standard-A",
        ssml_gender=texttospeech.SsmlVoiceGender.FEMALE,
    )

    # Select the type of audio file you want returned
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.MP3
    )

    # Perform the text-to-speech request on the text input with the selected
    # voice parameters and audio file type
    response = client.synthesize_speech(
        input=synthesis_input, voice=voice, audio_config=audio_config
    )

    # Return the audio content as a base64-encoded string
    audio_content = base64.b64encode(response.audio_content).decode("utf-8")
    return audio_content


# print(tts_link('Hello how are you'))