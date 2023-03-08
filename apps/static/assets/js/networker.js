
// **********************************************
// ************** SPEECH FUNCTIONS **************

var button = document.getElementsByTagName("push-to-talk-button")[0];
const inputElement = document.querySelector('#prompt textarea');
const airesponseTextArea = document.querySelector("#response textarea");
var isMuted = false;

button.addEventListener("speechsegment", (e) => {
  const speechSegment = e.detail;
  // console.log(speechSegment.intent);

  // ************** SEGMENT BY WORDS
  var note = false;
  var edit = false;
  const all_words = speechSegment['words'];

  all_words.forEach(phrase => {

      const word = phrase['value'];

    if(word === "note"){
      note = true;
    }
    else if(word == "edit"){
      edit = true;
    }

    // OPEN THE STUPID FORM AND MAKE SURE IT'S OPEN
    if (note && window.getComputedStyle(document.getElementById("addnotes")).display === "none") {
      document.getElementById("newnote").click();
        // Check if the modal is still hidden
      if (window.getComputedStyle(document.getElementById("addnotes")).display === "none") {
        // If it is hidden, make it visible
        document.getElementById("addnotes").style.display = "block";
      }
    }
  
  })



  // CHECK FOR NOTE AND LOG THE NOTE INTO THE BODY 
  if (note) {
    console.log("NOTE");
    var concatenatedWords = '';
    var noteIndex = all_words.findIndex(word => word['value'].toLowerCase() === 'note');
    if (noteIndex !== -1) {
      for (var i = noteIndex + 1; i < all_words.length; i++) {
        if (all_words[i]) {
          concatenatedWords += all_words[i]['value'] + " ";
        }
      }
      document.getElementById("form3").value = concatenatedWords;
    }
  }
  
  // ************** SEGMENT BY INTENT
  const intent = speechSegment.intent['intent'];
  // console.log(intent);
  if (intent === "update"){
    url = "about";
    console.log('UPDATEEE');
    // $expand.text =
    
  }
  if (intent === 'nav'){
    console.log("NAVIGATION");
  }
  if (intent === "info"){
    console.log("INFOOO")
  }
  if (intent === "search"){
    console.log("searrrccchh");
  }


  // ************** SEGMENT BY ENTITY 
  speechSegment.entities.forEach(entity => {

    // console.log(entity.type);
    // console.log(entity.value);

    // Send entity.value to "/verify_person" only once
    
    // LOOK UP DA PERSON
    if (entity.type === 'person') {
      console.log("Name entity has been found.", entity.name)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/verify_person');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        const name = xhr.response.replace(/"/g, '').trim();
        // window.location.href = 'about/?s='.concat(name);
        // console.log("Searching for ",name)
        
        if (note && entity.type==="person"){
          document.getElementById("form2").value = name;
        }
        
        const nameTds = document.querySelectorAll('td.name');

        for (let i = 0; i < nameTds.length; i++) {
        const nameTd = nameTds[i];
        if (nameTd.innerText.trim() === name) {
          const moreTd = nameTd.nextElementSibling;
          if (moreTd && moreTd.classList.contains('more')) {
            moreTd.scrollIntoView();
            const nextElement = moreTd.nextElementSibling;
            if (nextElement.style.display === 'none') {
              // If the next element is hidden, trigger a click event on the td element
              moreTd.click();
            }
            break;
          }
        }
      }
      }
    };
    xhr.send(JSON.stringify({entityValue: entity.value}));
  } // end person entity


  // *** ENTITY IS NOT PERSON - IE A FIELD
  if (entity.type !== 'person') {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/relevant_fields');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
      // console.log(entity.type);
    }}
    xhr.send(JSON.stringify({entitytype: entity.value}))
  }

  });

  if (speechSegment.isFinal) {
    const words = speechSegment.words;
    const wordsString = speechSegment.words.map(word => word.value).join(' ');
    // ADD TO PROMPT textarea
    inputElement.value = wordsString;
    if(!note){
    ask_question(wordsString);}

    }


});


// **********************************************
// ************** NON-SPEECH FUNCTIONS **************

// define the function that you want to perform


function ask_question(words) {
  return  fetch('/save_audio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        words: words
      })
    }).then(response => response.json())
      .then(data => {
        const airesponse = data.airesponse;
        airesponseTextArea.value = airesponse;
        // self.location.reload();
        if (!isMuted){
          console.log("NOT MUTED");
          const audioContent = data.audioContent;
          audioSrc = `data:audio/mpeg;base64,${audioContent}`;
          // resolve(audioSrc); // resolve the promise with audioSrc

          audio = new Audio(audioSrc);
          audio.play();
        }


      })
    console.log("Your query has been run!");
}

if (inputElement){
// ALTERNATIVELY, ENTERING IN SOMETHING MANUALLY
inputElement.addEventListener("keydown", function(event) {
  // check if the user pressed the "Enter" key
  if (event.key === "Enter") {
    event.preventDefault();
    const inputVal = inputElement.value;
    ask_question(inputVal);
  }
});
}



$('.more').click(function() {
  var $this = $(this);
  var $expand = $this.nextUntil('.more', '.expand'); 
  if ($this.text() === 'View More') {
    document.querySelectorAll('.expand').forEach(function(el) {
      el.style.display = 'none';
   });
    $this.text('View Less');
  } else {
    $this.text('View More');
  }
  
  $expand.slideToggle();
});


peopleTable = document.getElementById("people");
if (peopleTable){
peopleTable.addEventListener("keydown", function(event) {
  // check if the user pressed the "Enter" key
  if (event.key === "Enter") {
    event.preventDefault();
  }
})
}

// UPDATE A PERSON MANUALLY IN THE FORM
document.addEventListener("DOMContentLoaded", () => {
  const expandFields = document.querySelectorAll(".expand");

  expandFields.forEach(field => {
      field.addEventListener("keydown", e => {
          if (e.key === "Enter") {
            const td = e.target;
            const tr = td.parentElement;
            const nameTd = tr.querySelector("td[name]");
            const name = nameTd.getAttribute("name");          
            const value = field.textContent;
            // Change the background when enter is done
            // $(field).css("background-color", "green").fadeOut(3000);
            $(field).css("background-color", "green");
            // console.log("SUBMIT", name,value); // THE PEOPLE PAGE HAS BEEN SUBMITTED FOR UPDATES


              fetch('/up-person', {
                  method: 'POST',
                  body: new URLSearchParams({
                      name: name,
                      value: value
                  })
              })
              .then(response => response.json())
              // .then(data => console.log(data))
              .catch(error => console.error(error));
          }
      });
  });
});

$("#submit-note-btn").click(function() {
  // Get the values from the textareas
  console.log("SUBMIT BUTTON");
  var form2Data = $("#form2").val();
  var form3Data = $("#form3").val();

  // Send an AJAX request to the new-note endpoint with the data
  $.ajax({
    url: "/new_note",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({note: form2Data, person: form3Data}),
    success: function(response) {
      // Handle success response
      $('#addnotes').fadeOut();

    },
    error: function(xhr, status, error) {
      // Handle error response
    }
  });
});


// THE MUTE BUTTON

const originalLog = console.log;

// Replace console.log with a new function that checks isMuted before logging
// console.log = function() {
//   if (!isMuted) {
//     originalLog.apply(console, arguments);
//   }
// };

$(document).on('keypress', function(e) {
  if (e.key === 'm') {
    toggleMute();
  }
});

$('#mute').on('click', toggleMute);

function toggleMute() {
 
  isMuted = !isMuted;
  console.log("is quiet - ", isMuted);
  $('#mute i').toggleClass('icon-volume-98 icon-simple-remove');
  $('audio').each(function() {
    $(this).prop('muted', isMuted);
   
  });
};

// *********** END SCRIPT *********** 
