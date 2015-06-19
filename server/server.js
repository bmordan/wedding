Meteor.methods({
  rsvp: function (payload) {
    var guestList = Response.findOne({email: payload.email})
    if (!guestList) return Response.insert(payload)
    return false
  },
  guests: function () {
    return _.reduce(Response.find({}).fetch(), function (guests, data) {
      guests += parseInt(data.guests)
      return guests 
    }, 0)
  }
})