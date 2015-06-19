L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images'

Template.map.rendered = function () {
  $('#map').css('height', $(window).height() * 2)
  var token = 'pk.eyJ1IjoiYm1vcmRhbiIsImEiOiJvOHdmZ1pBIn0.SDHTHU1sNNTJRCgs4lfAEg'
  var light = 'bmordan.mdgog4e1'
  var opts = {
    scrollWheelZoom: false
  }
  var map = L.map('map', opts).setView([51.499, -0.13], 14)
  L.tileLayer('https://{s}.tiles.mapbox.com/v4/'+light+'/{z}/{x}/{y}.png?access_token='+token).addTo(map)
  new L.marker([51.4864606182951, -0.0926971435546875]).addTo(map)
}
Template.panel.rendered = function () {
  var panel = {
    width: $('.panel').width(),
    height: $('.panel').height()
  }
  $('.flip').css('height', panel.height+'px').css('width', panel.width+'px')
}
Template.rsvp.events({
  'click': function (e) {
    $('#card').addClass('flipped')
  }
})
Template.form.rendered = function () {
  $('#form').validate({
    errorClass: 'has-error',
    highlight: function (el, errorClass) {
      $(el).parent().addClass(errorClass)
    }
  })
  $('#attending').on('click', function (evt, tpl) {
    if ($(this).is(':checked')) {
      $('.attend').show('slow')
    }else{
      $('.attend').hide('slow')
    }
  })
}