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

  Meteor.Mandrill.config({
    username: 'bernard@tableflip.io',
    key: Meteor.settings.mandrill
  })
})

Meteor.methods({
  rsvp: function (payload) {
    var guest = Responses.findOne({email: payload.email})
    if (guest) return false
    Responses.insert(payload)
    Meteor.call('send', payload.email, payload.name.split(' ').pop())
    return false
  },
  guests: function () {
    return _.reduce(Responses.find({}).fetch(), function (guests, data) {
      guests += parseInt(data.guests)
      return guests 
    }, 0)
  },
  send: function (email, name) {
    Meteor.Mandrill.send({
      to: email,
      from: 'bernard@tableflip.io',
      subject: 'Siriol and Bernard\'s Wedding',
      html: 'Thanks ' + name + 'for letting us know you can make it. We are looking forward to seeing you on the Saturday 19th September 2pm. <br /><br />Bernard and Siriol'
    })
  }
})
