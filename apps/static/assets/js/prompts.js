console.log("prompts file");

async function synthesizeSpeech(text) {
    const speechsdk = require('microsoft-cognitiveservices-speech-sdk');
  
    // Set up the Speech Config object with your Azure Cognitive Services Text-to-Speech API key and region
    const speechConfig = speechsdk.SpeechConfig.fromSubscription("YourSubscriptionKey", "YourServiceRegion");
  
    // Set up the synthesis parameters
    const synthesisOptions = new speechsdk.SpeechSynthesisOptions();
    synthesisOptions.speechSynthesisVoiceName = "en-US-JessaNeural"; // Choose a voice
    synthesisOptions.text = text; // Set the text to be spoken
  
    // Create a new Speech Synthesizer object and synthesize the speech
    const synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, synthesisOptions);
    const result = await synthesizer.speakTextAsync();
  
    // Convert the synthesized audio to a binary data URL that can be played in an HTML audio element
    const audioData = result.audioData;
    const audioBlob = new Blob([audioData], { type: 'audio/wav' });
    const audioUrl = URL.createObjectURL(audioBlob);
  
    return audioUrl;
  }


  synthesizeSpeech("Hello World")
  .then(audioUrl => {
    const audioElement = document.createElement('audio');
    audioElement.src = audioUrl;
    audioElement.play();
  })
  .catch(error => console.error(`Error synthesizing speech: ${error}`));

  