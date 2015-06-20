FlowLayout.setRoot('body')

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
    rules: {
      attending: true
    },
    errorClass: 'has-error',
    highlight: function (el, errorClass) {
      $(el).parent().addClass(errorClass)
    },
    submitHandler: function (form) {
      var formData = {
        name: $('#name').val(),
        email: $('#email').val(),
        attending: $('#attending').is(':checked'),
        guests: $('#guests').val(),
        service: $('#service').is(':checked'),
        reception: $('#reception').is(':checked'),
        message: $('#message').val()
      }
      Meteor.call('rsvp', formData)
      $('#welcome').hide()
      $('#thanks').show()
      $('#thanks .addname').html('<h1>Thank you ' + formData.name.split(' ')[0] + '!</h1>')
      $('#card').removeClass('flipped')
    }
  })
  $('#attending').on('click', function (evt, tpl) {
    isOn() ? $('.attend').show('slow') : $('.attend').hide('slow')
  })
  $('button[type=reset]').on('click', function () {
    $('#card').removeClass('flipped')
  })
}

function isOn () {
  return $('#attending').is(':checked')
}
