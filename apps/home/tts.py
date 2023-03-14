# AZURE


import azure.cognitiveservices.speech as speechsdk
import io

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

try:
    SPEECH_KEY = subscription=os.environ.get('SPEECH_KEY')
except:
    from apps.home.creds import SPEECH_KEY 
SPEECH_KEY = '05fb95209bb34b20abb4cfa5287a3a85'

"""
Voices:
en-CA-LiamNeural
en-TZ-ImaniNeural
en-SG-LunaNeural
en-NG-AbeoNeural
en-KE-AsiliaNeural
en-IE-ConnorNeural
en-HK-SamNeural
en-US-JaneNeural
en-GB-AbbiNeural
en-AU-DarrenNeural
"""


def azure_speak_string(word,  SPEECH_KEY=SPEECH_KEY):
    # Create speech synthesizer
    speech_config = speechsdk.SpeechConfig(SPEECH_KEY, region='eastus')
    speech_config.speech_synthesis_voice_name = 'en-US-JaneNeural'
    # Create audio config with PullAudioOutputStream to capture audio data in memory
    audio_config = speechsdk.audio.AudioOutputConfig(
        stream=speechsdk.audio.PullAudioOutputStream()
    )

    # Create speech synthesizer
    speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config, audio_config=audio_config)

    # Synthesize speech and capture audio data in memory
    speech_synthesis_result = speech_synthesizer.speak_text_async(word).get()

    if speech_synthesis_result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
        print("Speech synthesized for text [{}]".format(word))
        audio_data = speech_synthesis_result.audio_data

        # Encode audio data as base64 string
        base64_data = base64.b64encode(audio_data).decode("utf-8")
        return base64_data, word

    elif speech_synthesis_result.reason == speechsdk.ResultReason.Canceled:
        cancellation_details = speech_synthesis_result.cancellation_details
        print("Speech synthesis canceled: {}".format(cancellation_details.reason))
        if cancellation_details.reason == speechsdk.CancellationReason.Error:
            if cancellation_details.error_details:
                print("Error details: {}".format(cancellation_details.error_details))
                print("Did you set the speech resource key and region values?")

    # Return None if speech synthesis failed
    return None

        


def azure_speak(word, SPEECH_KEY=SPEECH_KEY):
    if word != "":
        # Create speech synthesizer
        speech_config = speechsdk.SpeechConfig(SPEECH_KEY, region='eastus')
        speech_config.speech_synthesis_voice_name = 'en-US-JennyNeural'
        speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)
    

        # Synthesize speech
        result = speech_synthesizer.speak_text_async(word).get()

        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print("Speech synthesized for text [{}]".format(word))

        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            print("Speech synthesis canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                if cancellation_details.error_details:
                    print("Error details: {}".format(cancellation_details.error_details))
                    print("Did you set the speech resource key and region values?")


def azure_save(word, SPEECH_KEY=SPEECH_KEY):
    if word != "":
        # Create speech synthesizer
        speech_config = speechsdk.SpeechConfig(SPEECH_KEY, region='eastus')
        speech_config.speech_synthesis_voice_name = 'en-US-JennyNeural'
        speech_synthesizer = speechsdk.SpeechSynthesizer(speech_config=speech_config)

        # Synthesize speech
        result = speech_synthesizer.speak_text_async(word).get()

        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print("Speech synthesized for text [{}]".format(word))
            # Save audio file
            audio_data = result.audio_data
            with open("output.wav", "wb") as file:
                file.write(audio_data)
                print("Audio file saved as output.wav")
        elif result.reason == speechsdk.ResultReason.Canceled:
            cancellation_details = result.cancellation_details
            print("Speech synthesis canceled: {}".format(cancellation_details.reason))
            if cancellation_details.reason == speechsdk.CancellationReason.Error:
                if cancellation_details.error_details:
                    print("Error details: {}".format(cancellation_details.error_details))
                    print("Did you set the speech resource key and region values?")

# string = """
# Soon, users will be able to connect individuals via ai-drafted email automation, and add new users with AI business card scanning. With the assistant’s built-in conversation memory and MongoDB unstructured formatting, the Networker's personal CRM capabilities are endless.

# Networker is powered by Microsoft Azure, OpenAI, Speechly and Google Cloud computing. The future is limitless with the powers of AI, and networker will be one of many to bring it to fruition.  

# Happy networking!

# """
# azure_save(string)

# string = "One Moment"
# print(azure_speak_string(string))

# END AZURE


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
    print("tts_string()!!!")
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

def speak(text):
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
    return audio_content, text

# print(tts_link('Hello how are you'))
