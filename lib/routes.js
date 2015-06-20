FlowRouter.route(['/','/public','/home'], {
  action: function () {
    FlowLayout.render('layout', {main: 'public'})
  }
})
FlowRouter.route('/admin', {
  subscriptions: function () {
    this.register('listItem', Meteor.subscribe('responses'))
  },
  action: function () {
    FlowLayout.render('layout', {main: 'admin'})
  }
})
