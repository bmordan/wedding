Meteor.startup(function () {
  
  Meteor.users.remove({})

  Accounts.loginServiceConfiguration.remove({
    service : 'twitter'
  })

  Accounts.loginServiceConfiguration.insert({
    service     : 'twitter',
    consumerKey : Meteor.settings.consumerKey,
    secret      : Meteor.settings.secret
  })

  Accounts.onLogin(function (twitter) {
    var name = twitter.user.profile.name
    if (name !== 'bmordan') return Meteor.logout()
    Meteor.publish('responses', function () {
      return Responses.find({})
    })
  }) 
})

Meteor.methods({
  rsvp: function (payload) {
    var guestList = Responses.findOne({email: payload.email})
    if (!guestList) return Responses.insert(payload)
    return false
  },
  guests: function () {
    return _.reduce(Responses.find({}).fetch(), function (guests, data) {
      guests += parseInt(data.guests)
      return guests 
    }, 0)
  }
})
