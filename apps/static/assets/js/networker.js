$('.more').click(function() {
    var $this = $(this);
    var $expand = $this.nextUntil('.more', '.expand');
    $expand.slideToggle();
    $this.text($expand.is(':visible') ? 'View less' : 'View more');
    $this.text($expand.is(':hidden') ? 'View More' : 'View Less');
  });