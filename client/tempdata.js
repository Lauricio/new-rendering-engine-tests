

Meteor.startup(function () {

    Session.set("isTouch", Modernizr.touch);
});

  Session.set('dataOn', false)

function DataOnTime () {
  Session.set('dataOn', true)
  var interval = Meteor.setInterval(function () {
    Agenda.insert({agenda:'agenda'})
    if (Session.equals("dataOn", false)) {
        Meteor.clearInterval(interval)
    }
  }, 10000)
}

Template.ionscroller.helpers({
  agenda: function () {
    return Agenda.find();
  }
});

Template.hello.events({
  'click .js-startInsertClick': function () {
    if (Session.get('dataOn')) {
      Session.set('dataOn', false)
    } else
          DataOnTime();
  }
})