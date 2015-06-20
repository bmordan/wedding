FlowRouter.route(['/','/public','/home'], {
  action: function (params) {
    FlowLayout.render('layout', {main: 'public'})
  }
})
FlowRouter.route('/admin', {
  action: function (params) {
    FlowLayout.render('layout', {main: 'admin'})
  }
})
