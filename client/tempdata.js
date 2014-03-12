

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

Template.hello2.helpers({
  itemCount: function() {
    return Agenda.find().count();
  }


});




Template.hello2.events({
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
   },
     'click #open-modalClick, tap #open-modalTouch ' :function () {
        $( "#mainModal" ).addClass( "is-visible" );
        // StatusBar.hide();
    },
      'click #close-modalClick, tap #close-modalTouch' :function () {
            $( "#mainModal" ).removeClass( "is-visible" );
            // StatusBar.show();
        },
         'click #open-snap-modalClick, tap #open-snap-modalTouch ' :function () {
            $( "#snapMainModal" ).addClass( "is-visible" );
            setheight();
            // StatusBar.hide();
        },
          'click .close-snap-modalClick, tap .close-snap-modalTouch' :function () {
                $( "#snapMainModal" ).removeClass( "is-visible" );
                // StatusBar.show();
            }
})