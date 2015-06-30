FlowRouter.route(['/','/public','/home'], {
  action: function () {
    FlowLayout.render('layout', {main: 'public'})
  }
})
FlowRouter.route('/admin', {
  subscriptions: function () {
    this.register('guests', Meteor.subscribe('responses'))
  },
  action: function () {
    FlowLayout.render('layout', {main: 'admin'})
  }
})
FlowRouter.route('/admin/edit/:id', {
  subscriptions: function (params) {
    this.register('editResponse', Meteor.subscribe('responses', params.id))
    console.log('in route: ',this.register.editResponse)
  },
  action: function () {
    FlowLayout.render('layout', {main: 'editform'})
  }
})
