

Meteor.startup(function () {

    Session.set("isTouch", Modernizr.touch);
});

Handlebars.registerHelper('Touch',function(input){
    return Session.equals("isTouch", true) ? 'Touch' : 'Click';
});


  Session.set('dataOn', false)

function DataOnTime () {
  Session.set('dataOn', true)
  var interval = Meteor.setInterval(function () {
    Agenda.insert({createdAt: new Date()})
    if (Session.equals("dataOn", false)) {
        Meteor.clearInterval(interval)
    }
  }, 2000)
}

Template.ionscroller.helpers({
  agenda: function () {
    return Agenda.find({}, {sort: {createdAt: -1}});
  }


});

Template.hello.helpers({
  itemCount: function() {
    return Agenda.find().count();
  }


});




Template.hello.events({
  'click #insert-agendaClick, tap #insert-agendaTouch': function () {
    if (Session.get('dataOn')) {
      Session.set('dataOn', false)
    } else
          DataOnTime();
   },
   'click #delete-agenda': function () {
    Meteor.call('deleteAgenda')
   },
   'click #insert-agenda': function () {
    for (var i = 20; i >= 0; i--) {
      Agenda.insert({createdAt: new Date()})
    };
   }
})