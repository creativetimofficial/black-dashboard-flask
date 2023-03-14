
// **********************************************
// ************** SPEECH FUNCTIONS **************



var button = document.getElementsByTagName("push-to-talk-button")[0];
const inputElement = document.querySelector('#prompt textarea');
const airesponseTextArea = document.querySelector("#response textarea");
var isMuted = false;
var ask = true;
var nav = false;
var name = null;
var edit = false;
var set = false;
var newperson = false;
var ask_question_running = false;
var focus_element = '';
var bestmatch = '';
button.addEventListener("speechsegment", (e) => {
  

  const speechSegment = e.detail;
  // console.log(speechSegment.intent);

  // ************** SEGMENT BY WORDS
  var note = false;
  const all_words = speechSegment['words'];

  all_words.forEach(phrase => {

      const word = phrase['value'].toLowerCase();

    if(word === "note"){
      note = true;
      ask = false;
    }
    if(word == "new"){
      newperson = true;
      ask = false;
      nav = false;
    }
    if (word == "select"){
      ask=false;
    }
    else if(word == "edit"){
      edit = true;
    }
    else if(word == "help"){
      console.log("Help is requested");
    }
    else if (word == 'set'){
      console.log("SETEDIT")
      set = true;
    }
    else if (word == "mute" && !isMuted){
      toggleMute();
    }
    else if ( (word === "begin" | word === "began") && $('#login-button').length) {
      $('#login-button').click();
    }
    else if(word === "submit" && focus_element !== '' && speechSegment.isFinal){
      console.log("submitting all");
      const tds = document.querySelectorAll(".expand:not([style*='display: none'])");
      console.log("innertext", focus_element.innerText);
        tds.forEach((cell) => {
          console.log("innertext", cell.innerText);
          if(cell.innerText.indexOf(':') > -1){
            const event = new KeyboardEvent('keydown', {key: 'Enter', code: 'Enter', keyCode: 13, which: 13, bubbles: true});
            cell.dispatchEvent(event);        
          };
        });
        speak("Updated.")

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

        // OPEN THE STUPID FORM AND MAKE SURE IT'S OPEN
    if (newperson && window.getComputedStyle(document.getElementById("addperson")).display === "none") {
      document.getElementById("newperson").click();
        // Check if the modal is still hidden
      if (window.getComputedStyle(document.getElementById("addperson")).display === "none") {
        // If it is hidden, make it visible
        document.getElementById("addperson").style.display = "block";
      }
    }

  })

  // CHECK FOR FIELDS TO SELECT!
  if (set) {
    all_words.forEach(word  => {
      word = word['value'];
   // // DREW PASTED
   var arr = all_words.map(obj => obj.value);
  var index = arr.indexOf('set');
  if (index === -1) {
     console.log("Set not found in array");
   }
   else{
    var beforeTo = '';
    var afterTo = '';
    var subArr = arr.slice(index + 1);

    // Get the part before "to"
    var beforeToIndex = subArr.indexOf('to');
    if (beforeToIndex !== -1) {
      beforeTo = subArr.slice(0, beforeToIndex).join(' ');
    }
  afterTo = subArr.slice(beforeToIndex + 1).join(' ');
  // console.log("Before 'to': ", beforeTo);
  // console.log("After 'to': ", afterTo);

  }
  clicker_search(beforeTo,afterTo, focus_element.parentElement);

  });
  }


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
      if (speechSegment.isFinal){
         ask_question("This dialog came from speech to text AI. Reformat the dialog, responding ONLY in notes about what was said here. Do not say 'Sure, here are the bulleted notes...' - ONLY RESPOND IN NOTES.\n".concat(concatenatedWords), speech=false, show_response=false).then(airesponse => {
          document.getElementById("form3").value = airesponse; // Prints the airesponse value to the console
        });;
      }
    }
  }  


  // CHECK FOR NEW PERSON FORM SPEECH AND LOG THE NOTE INTO THE BODY 
  if (newperson && !nav) {
    var concatenatedWords = '';
    var noteIndex = all_words.findIndex(word => word && word['value'] && word['value'].toLowerCase() === 'person');
    if (noteIndex !== -1) {
      for (var i = noteIndex + 1; i < all_words.length; i++) {
        if (all_words[i]) {
          concatenatedWords += all_words[i]['value'] + " ";
          if (all_words[i]['value'].toLowerCase() === 'submit') {
            // Click the submit button
            document.getElementById('submit-person-btn').click();
          }
          if (i < noteIndex + 3){document.getElementById("personform2").value = concatenatedWords;}
        }
        
      }
      document.getElementById("personform3").value = concatenatedWords;
      if (speechSegment.isFinal){
         ask_question("This dialog came from speech to text AI. Reformat the dialog, responding ONLY in notes about what was said here in a json format.\n".concat(concatenatedWords), speech=false, show_response=false).then(airesponse => {
          document.getElementById("personform3").value = airesponse; // Prints the airesponse value to the console
        });;
      }
    }
  }  






  // ************** SEGMENT BY INTENT
  const intent = speechSegment.intent['intent'];
  // console.log(intent);
  if (intent === "update"){
    url = "about";
    console.log('"Update" Intent');
    // $expand.text =
    
  }
  if (intent === 'nav'){
    ask = false;
    nav = true;
  }
  if (intent === "info"){
    console.log("'Info' Intent")
  }
  if (intent === "search"){
    console.log("'search' intent");
  }


  // ************** SEGMENT BY ENTITY 
  speechSegment.entities.forEach(entity => {

    console.log(entity.type);
    console.log(entity.value);

    
    // IF THERE'S AN ENTITY OF A PERSON FOUD ANYWHERE IN YOUR SPEAKING, WE'RE GOING TO FIND THEIR FILE:
    // Send entity.value to "/verify_person" only once
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
        focus_element = nameTd;
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

      console.log("Removing edited");
      // document.classList.remove('edited');
      const editedElems = document.querySelectorAll('.edited');
  
      editedElems.forEach((elem) => {
        elem.classList.remove('edited');
      });
    



    if(!note && !nav && !edit){
    ask_question(wordsString);}
    }
    }


// EDIT THE FIELD FUNCTION:

function clicker_search(text, change_to_text, focus_element) {
  if(text){
    text = propercase(text);
    change_to_text = propercase(change_to_text);
    // Find elements that roughly match object_to_click with difflib's getCloseMatches() function
    // if (!ask_question_running){
    let elements;
  
    if (focus_element) {
      elements = Array.from(focus_element.querySelectorAll('td'));
    } else {
      elements = Array.from(document.querySelectorAll('#people td'));
    }
    const visibleElements = elements.filter(td => window.getComputedStyle(td).getPropertyValue('display') !== 'none');
    
    const matches = difflib.getCloseMatches(text, visibleElements.map(td => {
      const match = td.innerText.match(/^(.*?)\bto\b/);
      return match ? match[1].trim() : '';
    }), 1, 1);
  
    // If there are no matches, try again with a lower threshold and set clarify_flag
    let clarify_flag = false;
    if (matches.length === 0) {
      var lowermatch = difflib.getCloseMatches(text, elements.map(td => td.innerText), 1, 0.2);
      if (lowermatch.length > 0) {
        matches.push(lowermatch[0]);
        clarify_flag = true;
        // console.log("LOWER MATCH",lowermatch[0]);
      }
    }
    // Click the most likely match
  if (matches.length > 0) {
    const bestmatch = matches[0];
    ask_question_running = true;
    const element = elements.find(td => td.innerText === bestmatch);
    if (!element.classList.contains('edited')) { // check if the element has already been edited
  
      element.classList.add('edited'); // add the 'edited' class to mark the element as edited
      // Check if the text in the element contains a colon
    } else {
      const colonIndex = element.innerText.indexOf(":");
      if (colonIndex > -1) {
        // Get the text after the colon and trim it
        const textAfterColon = element.innerText.substring(colonIndex + 1).trim();
        if (textAfterColon.length > 0) {
          if (change_to_text) {
            const currentText = element.innerText;
            const separatorIndex = currentText.indexOf(':');
            if (separatorIndex >= 0) {
              const prefix = currentText.substr(0, separatorIndex + 1);
              element.innerText = prefix + " " + change_to_text;
            } else {
              element.innerText = change_to_text;
            }
          }
        }
      } else {
        // If the text in the element doesn't contain a colon, just replace the entire text with the new text
        const newText = change_to_text.trim();
        element.innerText = newText;
      }
  
      element.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
      setTimeout(() => {
        // Fade back to normal color after 1 second
        element.style.transition = "background-color 0.5s ease";
        element.style.backgroundColor = "";
        ask_question_running = true;
      }, 1000);
      // TO SUBMIT THE ENTRY
      
      }
    }
    return [ clarify_flag,  bestmatch ];}}
  // }
  

// END EDIT FIELD

    





// *******  END SPEECH SEGMENT ********
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

// DELETES THE ROW WITH THE .DELETEOBJECT CLASS
function deleteField() {
  var button = $(this); // Get a reference to the clicked button
  button.prop('disabled', true); // Disable the button to prevent multiple clicks
  var tdElement = this.parentNode; // get the parent td element
  var objectId = tdElement.getAttribute('object');
  var person_name = tdElement.getAttribute('name');
  var field_name = tdElement.getAttribute('oldfield');
  console.log(objectId , person_name, field_name);
  // Send a DELETE request to the Flask endpoint
  $.ajax({
    url: '/remove-field/' + objectId + '/' + person_name + '/' + field_name ,
    type: 'POST',
    success: function(result) {
      // Reload the page or update the table as needed
      $(tdElement).remove();
    },
    error: function(err) {
      console.log(err);
    },
    complete: function() {
      button.prop('disabled', false); // Re-enable the button once the request is complete
    }
  });
}

// Attach the click event handler to the delete button
$('.remove-field').on('click', deleteField);


function ask_question(words, speech=true, show_response=true) {
  if(ask_question_running){
    return;
  }
  ask_question_running = true;
  // THIS IS THE UM BEFORE THE TEXT RESPONSE
  
    if (audio && !audio.paused) {
      audio.pause();
    }

    if (speech && !isMuted && words.length > 12){
      audioSrc = `data:audio/mpeg;base64,${randomOne()}`;  
      audio = new Audio(audioSrc);
      audio.playbackRate = 1.4;
      audio.pitch = 0.714;
      audio.play();
      };
  

  // }
  return  fetch('/ask_question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        words: words,
        "networking": true
      })
    }).then(response => response.json())
      .then(data => {
        const airesponse = data.airesponse;
        
        if (show_response){airesponseTextArea.value = airesponse;}
        if (speech && !isMuted) {speak(airesponse)}
        ask_question_running = false;
        return airesponse;
      }) 
      }
    console.log("Your query has been run!");

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

  // NAME CHANGING IN FORM
  const namefields = document.querySelectorAll(".name");
  namefields.forEach(field => {
      field.addEventListener("keydown", e => {
          if (e.key === "Enter") {
            console.log("Name enter");
            var oldname = field.getAttribute("name");           
            const value = field.textContent;
            $(field).css("background-color", "green");
            // element.parentElement.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
            setTimeout(() => {
            // Fade back to normal color after 1 second
            field.style.transition = "background-color 0.5s ease";
            field.style.backgroundColor = "";
            }, 1000);
            field.blur(); // Remove focus from the td element
            speak("Name Changed.");
            fetch('/up-person', {
              method: 'POST',
              body: new URLSearchParams({
                  name: oldname,
                  value: value,
                  oldvalue : oldname,
                  namechange:true
              })
          })
          .then(response => response.json())
          // .then(data => console.log(data))
          .catch(error => console.error(error));
          }})
        });

// CHANGING THEIR FIELDS IN THE FORM:
  const expandFields = document.querySelectorAll(".expand");
  expandFields.forEach(field => {
      field.addEventListener("keydown", e => {
          if (e.key === "Enter") {
            
            const td = e.target;
            const tr = td.parentElement;
            const nameTd = tr.querySelector("td[name]");
            var name = nameTd.getAttribute("name"); 
            var oldvalue = field.getAttribute("oldfield");           
            const value = field.textContent;
            // Change the background when enter is done
            // $(field).css("background-color", "green").fadeOut(3000)
            $(field).css("background-color", "green");
            // element.parentElement.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
            setTimeout(() => {
            // Fade back to normal color after 1 second
            field.style.transition = "background-color 0.5s ease";
            field.style.backgroundColor = "";
            }, 1000);
            field.blur(); // Remove focus from the td element
            speak("Updated.");
            // console.log("SUBMIT", name,value); // THE PEOPLE PAGE HAS BEEN SUBMITTED FOR UPDATES
              fetch('/up-person', {
                  method: 'POST',
                  body: new URLSearchParams({
                      name: name,
                      value: value,
                      oldvalue : oldvalue,
                      namechange:false
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
  var form3Data = formatTextAsList($("#form3").val());
  console.log(form3Data);

  // Send an AJAX request to the new-note endpoint with the data
  $.ajax({
    url: "/new_note",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({note: form3Data, person:form2Data }),
    success: function(response) {
      // Handle success response
     
      document.getElementById("form3").value = "";

    },
    error: function(xhr, status, error) {
      // Handle error response
    }
  });
});

$("#submit-person-btn").click(function() {
  // Get the values from the textareas
  $('#addperson').fadeOut('fast');
  $('.modal-backdrop.fade.show').fadeOut('fast');

  var form2Data = $("#personform2").val();
  var form3Data = $("#personform3").val();
  console.log(form3Data);

  // Send an AJAX request to the new-note endpoint with the data
  $.ajax({
    url: "/new_person",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({note: form3Data, person:form2Data }),
    success: function(response) {
      // Handle success response
      document.getElementById("personform3").value = "";
    },
    error: function(xhr, status, error) {
      // Handle error response
    }
  });
});


// THE MUTE BUTTON

$(document).on('keypress', function(e) {
  if ((e.key === 'm' ) && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TD' && e.target.nodeName !== 'TEXTAREA' && e.target.nodeName !== 'SELECT' && e.target.nodeName !== 'BUTTON' && e.target.nodeName !== 'OPTION') {
    toggleMute();
  }
  if (e.code === "Space") {
    e.preventDefault();
    window.scrollBy(0, 0);
  }
  if ((e.key === '/' ) && e.target.nodeName !== 'INPUT' && e.target.nodeName !== 'TD' && e.target.nodeName !== 'TEXTAREA' && e.target.nodeName !== 'SELECT' && e.target.nodeName !== 'OPTION') {
    e.preventDefault();
    console.log("/ click");
    $('#search-button').click();
    setTimeout(function() {
      $('#inlineFormInputGroup').focus();
    }, 500);
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
    const options = { headers:{'Content-Type': 'application/json'}, method:'POST', body: JSON.stringify({body:text}) };
    const response = await fetch( '/speak', options);
    const data = await response.json();
    const audioContent = data.audioContent;
    audioSrc = `data:audio/mpeg;base64,${audioContent}`;
    if (audio && !audio.paused) {
      audio.pause();
    }
    audio = new Audio(audioSrc);
    
    audio.playbackRate = 1.4;
    audio.pitch = 0.714;
    audio.play();
    return data.textResult;
  }
  return false;
}

function handleSearch() {
  const input = document.querySelector('#inlineFormInputGroup');
  input.addEventListener('keydown', function(event) {
    if (event.key === "Enter") { // Check for Enter key press
      const query = input.value;
      window.location.href = `/people?s=${query}`; // Redirect to specific URL
    }
  });
}
handleSearch();

function find_field(name, value) {
  console.log("name, value:",name,value);
  var tds = document.querySelectorAll(".expand:not([style*='display: none'])");

  for (var i = 0; i < tds.length; i++) {
    var td = tds[i];
    var parts = td.textContent.split(':');
    console.log("value ", value.join(" "));

    if (parts[0].trim().toLowerCase() === name) {
      td.style.backgroundColor = "rgba(255, 255, 0, 0.5)";
      td.textContent = name.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}); + " : " + value.join(" ");
      
      break;
    }
  }
  // speak("Set",value.join(" "))
}


// PLAYING WITH TEXT
function propercase(text) {
  return text.replace(/\w\S*/g, function(word) {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
}


function formatTextAsList(inputText) {
  const lines = inputText.split("\n");
  let html = "<ul>";

  lines.forEach(function(line) {
    html += "<li>" + line + "</li>";
  });

  html += "</ul>";
  return html;
}

// focus_element

document.addEventListener("keydown", function(event) {
  if (event.key === "Space") {
    if (audio && !audio.paused) {
      audio.pause();
    }
    event.preventDefault();
    stopPropagation();

  }
  if (event.key === "$") {
   speak("Screw you Rothstein");
  }
  if (event.key === "f") {
    clicker_search("Company", "set to yale college");
    console.log("find");
  }
});


// *********** END SCRIPT *********** 
