$('.more').click(function() {
  var $this = $(this);
  var $expand = $this.nextUntil('.more', '.expand');
  $expand.slideToggle();
  if ($expand.is(':visible')) {
    $this.text('View Less');
    $this.click(function(){
      $this.text('View More');
  
    })
  }
  else {
    $this.text('View More');
  }

});

var button = document.getElementsByTagName("push-to-talk-button")[0];

button.addEventListener("speechsegment", (e) => {
  const speechSegment = e.detail;

  // PRINT THE TYPE OF INQUIRY - UPDATE, SEARCH, INFO
  console.log(speechSegment.intent['intent']);    

  
  speechSegment.entities.forEach(entity => {
    console.log(entity.type);
    console.log(entity.value);

    // Send entity.value to "/verify_person" only once
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/verify_person');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function() {
      if (xhr.status === 200) {
        console.log(xhr.response);
      }
    };
    xhr.send(JSON.stringify({entityValue: entity.value}));
  });
});
