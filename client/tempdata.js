

ViewsControl = {
  go: function (type, itemId) {
    Session.set('mainViewVisible', true)
    AppViews.insert({type: type, itemId: itemId}, function (err) {
      if (err && AppViews.find().count() === 0)
        Session.set('mainViewVisble', false)
    })
  },
  back: function (viewId) {
    var element = document.getElementById(viewId)
    element.addEventListener( 'webkitTransitionEnd', 
      function( event ) { 
        AppViews.remove({_id: viewId}, function (err, res) {
          if (res) {
            if (AppViews.find().count() === 0) {
              Session.set('mainViewVisible', false)
            }
          } else if (ppViews.find().count() === 0) { 
              Session.set('mainViewVisible', false)
              console.log(err)
          }
        })
        
      }, false );
    element.className += ' animate';
  },
  reset: function () {
    Session.set('mainViewVisible', false)
  }
};


Template.mainModal.rendered = function () {
  document.getElementById('mainModal').addEventListener( 'webkitTransitionEnd', 
      function( event ) { 
        if (event.target.id === 'mainModal') {
          AppViews.remove({})
        }
      }, true );
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
    return Agendas.find({}, {sort: {createdAt: -1}});
  }


});

Template.hello2.helpers({
  itemCount: function() {
    return Agendas.find().count();
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
      Agendas.insert({createdAt: new Date()})
    };
   },
     'click #open-modalClick, tap #open-modalTouch ' :function () {
        // $( "#mainModal" ).addClass( "is-visible" );
        Session.set('mainViewVisible', true)
        ViewsControl.go('agendaView','agenda1')
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

Template.agendaItem.events({
  'click .js-openAgendaV': function () {
    ViewsControl.go('agendaView', this._id)

  }
})
