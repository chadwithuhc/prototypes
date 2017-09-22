jQuery(function($) {

  var $location = $('[data-location]')
  var timeout = 300

  function init() {
    $location.on('click', function(e) {
      e.preventDefault()
      $location.text('•')
      setTimeout(function() {
        $location.text('••')

        setTimeout(function() {
          $location.text('•••')

          setTimeout(function() {
            $location.text('Denver, CO')

          }, timeout)
        }, timeout)
      }, timeout)
    })
  }

  init()

})
