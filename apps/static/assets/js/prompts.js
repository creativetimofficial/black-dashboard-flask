// console.log("prompts file");
// const sdk = require("microsoft-cognitiveservices-speech-sdk");
// async function synthesizeSpeech(text) {
//   const speechConfig = SpeechSDK.SpeechConfig.fromSubscription("[SPECH]", "YourServiceRegion");
//   speechConfig.speechSynthesisOutputFormat = SpeechSDK.SpeechSynthesisOutputFormat.Riff16Khz16BitMonoPcm;

//   speechConfig.setLanguage("en-US");
//   speechConfig.setVoice("en-US-JessaNeural");

//   const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, null);
//   const result = await synthesizer.speakTextAsync(text);

//   const audioData = result.audioData;
//   const audioBlob = new Blob([audioData], { type: 'audio/wav' });
//   const audioUrl = URL.createObjectURL(audioBlob);

//   return audioUrl;
// }





//   synthesizeSpeech("Hello World")
//   .then(audioUrl => {
//     const audioElement = document.createElement('audio');
//     audioElement.src = audioUrl;
//     audioElement.play();
//   })
//   .catch(error => console.error(`Error synthesizing speech: ${error}`));

  