Responses = new Mongo.Collection('responses')
Responses.allow({
  remove: function (userId, doc) {
    return true
  }
})