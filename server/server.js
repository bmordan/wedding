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
      return Responses.find({}, {sort: {name: 1}})
    }) 
  })

})

Meteor.methods({
  rsvp: function (payload) {
    var guestList = Responses.findOne({email: payload.email})
    if (!guestList) {
      Responses.insert(payload)
      Meteor.call('send', payload)
      return
    }
    return false
  },
  guests: function () {
    return _.reduce(Responses.find({}).fetch(), function (guests, data) {
      guests += parseInt(data.guests)
      return guests 
    }, 0)
  },
  send: function (payload) {
    var content = getEmailContent(payload)
    Meteor.Mandrill.sendTemplate(content)
  }
})
function getEmailContent (payload) {
  return {
    "key" : Meteor.settings.mandrill,
    "template_name" : "wedding-email",
    "template_content" : [
      {
        "name" : "name",
        "content" : payload.name.split(' ')[0]
      }
    ],
    "message" : {
      "global_merge_vars" : _getMergeVars(payload),
      "to" : _getResponseEmails(payload)
    }
  }
}
function _getMergeVars (payload) {
  var mergeVars = []
  if (parseInt(payload.numGuests) === 1) {
    var plural = 'guest'
  } else {
    var plural = "guest's"
  }

  if (payload.guests > 0) {
    mergeVars.push({
      "name" : "numGuests",
      "content" : payload.numGuests
    },{
      "name" : "plural",
      "content" : plural
    })
  }

  if (payload.message) {
    mergeVars.push({
      "name" : "message",
      "content" : true
    })
  }

  if (payload.service) {
    mergeVars.push({
      "name" : "service",
      "content" : true
    })
  }

  if (payload.reception) {
    mergeVars.push({
      "name" : "reception",
      "content" : true
    })
  }

  return mergeVars
}
function _getResponseEmails (payload) {
  return [
    {
      "email" : payload.email,
      "name" : payload.name,
      "type" : "to"
    },
    {
      "email" : "bernardmordan@gmail.com",
      "name" : "Bernard",
      "type" : "bcc"
    },
    {
      "email" : "sirioldavies@yahoo.co.uk",
      "name" : "Siriol",
      "type" : "bcc"
    }
  ]
}
