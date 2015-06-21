FlowLayout.setRoot('body')

L.Icon.Default.imagePath = '/public'

Template.map.rendered = function () {
  $('#map').css('height', $(window).height() * 2)
  var token = 'pk.eyJ1IjoiYm1vcmRhbiIsImEiOiJvOHdmZ1pBIn0.SDHTHU1sNNTJRCgs4lfAEg'
  var light = 'bmordan.mdgog4e1'
  var opts = {
    scrollWheelZoom: false
  }
  var pin = L.icon({
    iconUrl: 'stPetersPin.png',
    shadowUrl: 'stPetersShadow.png',
    iconSize: [60, 140],
    shadowSize: [90, 130],
    iconAnchor: [20, 150],
    shadowAnchor: [0, 135]
  })
  var map = L.map('map', opts).setView([51.4864606182951, -0.0926971435546875], 14)
  L.tileLayer('https://{s}.tiles.mapbox.com/v4/'+light+'/{z}/{x}/{y}.png?access_token='+token).addTo(map)
  L.marker([51.4864606182951, -0.0926971435546875], {icon: pin}).addTo(map)
  positionMap(map)
  $(window).on('resize', function () {
    positionMap(map)
  })
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
      $('#thanks').show().css('height', $('#welcome').height())
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
Template.login.events({
  'click': function (evt, tpl) {
    $('#login').modal('toggle')
  }
})
Template.admin.helpers({
  listItem: function () {
    return Responses.find().fetch()
  },
  trim: function (str) {
    return str.slice(0,6) + '...'
  }
})
function isOn () {
  return $('#attending').is(':checked')
}
function positionMap (map) {
  var pos = {x: $(window).width(), y: $(window).height()}
  var xoffset = (pos.x/4)
  map.panBy([-xoffset/2,12])
}
