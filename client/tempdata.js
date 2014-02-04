ViewsControl = {
  go: function (type, itemId) {
    AppViews.insert({type: type, itemId: itemId})
  },
  back: function (viewId) {
    AppViews.remove({_id: viewId});
  }
};

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

Session.set("hideOverflow", false)


Template.hello2.events({
  'click #insert-agendaClick, tap #insert-agendaTouch': function () {
    if (Session.get('dataOn')) {
      Session.set('dataOn', false)
    } else
          DataOnTime();
   },
   'click #delete-agendaClick, tap #delete-agendaTouch': function () {
    Meteor.call('deleteAgenda')
   },
   'click #insert-20-agendaClick, tap #insert-20-agendaTouch': function () {
    for (var i = 20; i >= 0; i--) {
      Agenda.insert({createdAt: new Date()})
    };
   },
     'click #open-modalClick, tap #open-modalTouch ' :function () {
        $( "#mainModal" ).addClass( "is-visible" );
        Modals.insert({templateName: 'mainModalContent2', Zindex:50})
        // Session.set("hideOverflow", true)
        // StatusBar.hide();
    },
         'click #open-snap-modalClick, tap #open-snap-modalTouch ' :function () {
            $( "#snapMainModal" ).addClass( "is-visible" );
            Session.set("hideOverflow", true)
            setheight();
            // StatusBar.hide();
        },
          'click .close-snap-modalClick, tap .close-snap-modalTouch' :function () {
                Session.set("hideOverflow", false)
                $( "#snapMainModal" ).removeClass( "is-visible" );
                // StatusBar.show();
            },
        'click #test-overflowClick, tap #test-overflowTouch': function () {
          Session.equals('hideOverflow', true) ? Session.set("hideOverflow", false) : Session.set('hideOverflow', true);
        }    

});
