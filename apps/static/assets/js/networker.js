
// **********************************************
// ************** SPEECH FUNCTIONS **************

var button = document.getElementsByTagName("push-to-talk-button")[0];
const inputElement = document.querySelector('#prompt textarea');
const airesponseTextArea = document.querySelector("#response textarea");
var isMuted = false;
var ask = true;
var nav = false;
var name = null;

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
      ask = false;
    }
    else if(word == "edit"){
      edit = true;
    }
    else if (word == "mute" && !isMuted){
      toggleMute();
    }


    if (edit && name) {
      const nameTds = document.querySelectorAll('td.expand');
  
      for (let i = 0; i < nameTds.length; i++) {
      const nameTd = nameTds[i];
      if (nameTd.innerText.includes(word.trim()) && nameTd.getAttribute('name') === name) {
        // PUT THE CURSOUR ON THE TD THEN SHADE THE BACKGROUND TRANSPARENT YELLOW 
        nameTd.style.backgroundColor = 'rgba(255, 255, 0, 0.5)'; // set background color to transparent yellow
        nameTd.focus();
      }
      }
  
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
  if (note && !nav) {
    var concatenatedWords = '';
    var noteIndex = all_words.findIndex(word => word && word['value'] && word['value'].toLowerCase() === 'note');
    if (noteIndex !== -1) {
      for (var i = noteIndex + 1; i < all_words.length; i++) {
        if (all_words[i]) {
          concatenatedWords += all_words[i]['value'] + " ";
          if (all_words[i]['value'].toLowerCase() === 'submit') {
            // Click the submit button
            document.getElementById('submit-note-btn').click();
          }
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
    ask = false;
    nav = true;
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
      console.log("Name entity has been found.", entity.value)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/verify_person');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        var name = xhr.response.replace(/"/g, '').trim();
        // window.location.href = 'about/?s='.concat(name);
        // console.log("Searching for ",name)
        
        if (note && entity.type==="person"){
          document.getElementById("form2").value = name;
          console.log(name);
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
  // if (entity.type !== 'person') {
  //   const xhr = new XMLHttpRequest();
  //   xhr.open('POST', '/relevant_fields');
  //   xhr.setRequestHeader('Content-Type', 'application/json');
  //   xhr.onload = function() {
  //     if (xhr.status === 200) {
  //     // console.log(entity.type);
  //   }}
  //   xhr.send(JSON.stringify({entitytype: entity.value}))
  // };
  console.log(entity.type);
  if (entity.type === 'page') {
    console.log(entity);
    var url = '/'.concat(entity.value.toLowerCase());
    window.location.replace(url);
  };
  

  // END ENTITY SEARCHES
  });


  // ******* BROWSE FINAL SPEECH SEGMENT *******
  if (speechSegment.isFinal) {
    const words = speechSegment.words;
    const wordsString = speechSegment.words.map(word => word.value).join(' ');
    // ADD TO PROMPT textarea
    if (inputElement != null){
    inputElement.value = wordsString;
    speechSegment.entities
    speechSegment.entities.forEach(entity => {
      if (entity.type === 'person') {
        name = entity.name;
        console.log("looking up ", name, " in context");
      }})




    if(!note){
    ask_question(wordsString);}
    }
    }


});


// **********************************************
// ************** NON-SPEECH FUNCTIONS **************



// DELETES THE ROW WITH THE .DELETEOBJECT CLASS
function deleteObject() {
  // Get the object ID and collection name from the clicked row
  var objectId = $(this).closest('tr').attr('value');
  var collectionName = $(this).closest('tr').attr('name');
  console.log(collectionName , objectId);
  // Send a DELETE request to the Flask endpoint
  $.ajax({
    url: '/delete/' + collectionName + '/' + objectId,
    type: 'POST',
    success: function(result) {
      // Reload the page or update the table as needed
      location.reload();
    },
    error: function(err) {
      console.log(err);
    }
  });
}

// Attach the click event handler to the delete button
$('.delete-button').on('click', deleteObject);


function ask_question(words) {
  if (ask){
  return  fetch('/ask_question', {
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
        speak(airesponse);
      }) }
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
            speak("Update");
            const td = e.target;
            const tr = td.parentElement;
            const nameTd = tr.querySelector("td[name]");
            var name = nameTd.getAttribute("name");          
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
  $('#addnotes').fadeOut('fast');
  $('.modal-backdrop.fade.show').fadeOut('fast');

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
     
      document.getElementById("form3").value = "";

    },
    error: function(xhr, status, error) {
      // Handle error response
    }
  });
});


// THE MUTE BUTTON

$(document).on('keypress', function(e) {
  if (e.key === 'm' && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TEXTAREA' && e.target.nodeName !== 'SELECT' && e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'OPTION') {
    toggleMute();
  }
});

$('#mute').on('click', toggleMute);

// MUTE TOGGLE
async function toggleMute() {
  isMuted = !isMuted;
  console.log("is quiet - ", isMuted);
  $('#mute i').toggleClass('icon-volume-98 icon-simple-remove');
  $('audio').each(function() {
    $(this).prop('muted', isMuted);
  })
  if(!isMuted){speak("Unmuted"); }else {
    if (audio && !audio.paused) {
      audio.pause();
    } };
};


// LISTEN FOR SPEECH - SPEAKING FUNCTION
let audio = null;

async function speak(text) {
  if (!isMuted) {
    const response = await fetch(`/speak/${text}`);
    const data = await response.json();
    const audioContent = data.audioContent;
    audioSrc = `data:audio/mpeg;base64,${audioContent}`;
    if (audio && !audio.paused) {
      audio.pause();
    }
    audio = new Audio(audioSrc);
    audio.play();
    return data.textResult;
  }
  return false;
}





// *********** END SCRIPT *********** 
