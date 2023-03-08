
// IF SOMEONE FILLS OUT THE PROMPT AND WANTS TO RESEND:
const responseTextArea = document.querySelector("#response textarea");
// add an event listener for when the user submits the form
if (responseTextArea) {
  
  // Implement a listener for speech segment updates
window.onload=function(){

let audio = null;
var button = document.getElementsByTagName("push-to-talk-button")[0];

if (button){
// SPACE BAR SUBSTITUTE FOR BUTTON PUSH
document.addEventListener("keydown", (event) => {

  // Check if the currently focused element is a textarea element
  const focusedElement = document.activeElement;
  const isMainarea = focusedElement.tagName === "main";
  const isTextarea = focusedElement.tagName === "TEXTAREA";

  if (event.key === ' ' && !isTextarea && isMainarea) {
    
  }
});


// NOW SPEECH SPEECH SPEEEEECCCHHH
button.addEventListener("speechsegment", (e) => {

  const speechSegment = e.detail;
  
      // OLD JS
      speechSegment.entities.forEach(entity => {
        console.log(entity.type);
        console.log(entity.person_name);
      })


  // Check if the speech segment is the final segment - AKA You're done talking!
  if (speechSegment.isFinal) {
    const words = speechSegment.words;
    const wordsString = speechSegment.words.map(word => word.value).join(' ');

    // ADD TO PROMPT textarea
    const inputElement = document.querySelector('#response textarea');
    inputElement.value = wordsString;
    save_audio(wordsString);

    }
  });

responseTextArea.addEventListener("keydown", function(event) {
  // check if the user pressed the "Enter" key
  if (event.key === "Enter") {
    event.preventDefault();
    const responseText = responseTextArea.value;
    console.log(responseText);
    // call your desired function here
    // var airesponse = save_audio(responseText);

    const e = document.querySelector("#brand");
    var preprompt = e.options[e.selectedIndex].value;

    console.log(preprompt);
    var airesponse = save_audio(preprompt.concat(responseText));
    // console.log("AI RESPONSE file:", airesponse, " end");

  }
});

// define the function that you want to perform
function save_audio(words) {
  return new Promise((resolve, reject) => {
    let audioSrc = "";
    fetch('/save_audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        words: words
      })
    }).then(response => response.json())
      .then(data => {
        const audioContent = data.audioContent;
        audioSrc = `data:audio/mpeg;base64,${audioContent}`;
        const airesponse = data.airesponse;
        const airesponseTextArea = document.querySelector("#airesponse textarea");
        airesponseTextArea.value = airesponse;
        resolve(audioSrc); // resolve the promise with audioSrc

        audio = new Audio(audioSrc);
        audio.play();
      })
      .catch(error => {
        console.error(error);
        reject(error); // reject the promise with the error
      });
    console.log("Your query has been run!", audioSrc);
  });
}

};

}; // IF TEXTAREA FOUND 

window.onload.resize=function() {
  var scrollWidth = $('.tbl-content').width() - $('.tbl-content table').width();
  $('.tbl-header').css({'padding-right':scrollWidth});
};

var hoverlog = document.getElementById("hoverlog");
var log = document.getElementById("log");

// if (hoverlog){
// hoverlog.onclick=function(){
//   $("#log").slideToggle( "slow", function() {
//     // Animation complete.
//   });

// }};


}

