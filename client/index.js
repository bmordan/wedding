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
    iconSize: [60, 110],
    shadowSize: [90, 100],
    iconAnchor: [20, 120],
    shadowAnchor: [0, 100]
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
        attending: $('#attending').prop('checked'),
        numGuests: $('#guests').val(),
        service: $('#service').prop('checked'),
        reception: $('#reception').prop('checked'),
        message: $('#message').val()
      }
      Session.set('attending', formData.attending)
      Session.set('name', formData.name.split(' ')[0])
      if (formData.message) Session.set('leftMessage', formData.message)

      Meteor.call('rsvp', formData)

      window.scrollTo(0, 0)
      $('#welcome').hide()
      $('#thanks').show()
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
Template.admin.helpers({
  isReady: function (sub) {
    if (sub) {
      return FlowRouter.subsReady(sub)
    } else {
      return FlowRouter.subsReady()
    }
  },
  guests: function () {
    return Responses.find().fetch()
  }
})
Template.msg.helpers({
  trim: function (str) {
    return str.slice(0,6) + '...'
  }
})
Template.msg.events({
  'click': function (e) {
    var id = $(e.target).data('id')
    Session.set('guestId', id)
    $('#guestModal').modal('toggle')
  }
})
Template.thanks.helpers({
  isAttending: function () {
    return Session.get('attending')
  },
  leftMessage: function () {
    return Session.get('leftMessage')
  },
  getName: function () {
    return Session.get('name')
  }
})
Template.removeGuest.events({
  'click': function (evt, tpl) {
    var id = $(evt.target).data('id')
    Responses.remove({_id: id})
  }
})
Template.guestModal.helpers({
  getGuest: function () {
    var id = Session.get('guestId')
    if (!id) return $('#guestModal').modal('hide')
    return Responses.findOne({_id: id}) 
  },
  getFirstName: function (fullName) {
    return _.first(fullName.split(' '))
  }
})
function isOn () {
  return $('#attending').prop('checked')
}
function positionMap (map) {
  var pos = {x: $(window).width(), y: $(window).height()}
  var xoffset = (pos.x/4)
  map.panBy([-xoffset/2,12])
}
