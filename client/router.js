Router.configure({
      layoutTemplate: 'layout'
});

Router.map( function () {
 this.route('home', {
    path: '/'
  
    });

  this.route('modal', {
    path: '/modal',
    template: 'modalModal'
  });
})