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


