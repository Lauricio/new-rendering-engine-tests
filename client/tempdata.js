

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
    element.className += ' animate';
    if (AppViews.find().count() === 1) {
        Session.set('mainViewVisible', false)
      }
    element.addEventListener( 'webkitTransitionEnd', 
      function( event ) { 
        AppViews.remove({_id: viewId}, function (err, res) {
          if (res) {
            if (AppViews.find().count() === 0) {
              Session.set('mainViewVisible', false)
            }
          } else if (AppViews.find().count() === 0) { 
              Session.set('mainViewVisible', false)
              console.log(err)
          }
        })
        
      }, false );
  },
  reset: function () {
    Session.set('mainViewVisible', false)
  }
};


Template.mainModal.rendered = function () {
  if (AppViews.find().count() === 0)
    Session.set('mainViewVisible', false)
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

Template.agendaView.rendered = function () {
  // document.getElementById("spinner").className =
  //     document.getElementById("spinner").className.replace(/\is-visible\b/,'');
  document.getElementById('spinner').classList.remove('is-visible')
};

Template.agendaView.helpers({
  agendas: function() {
    return Agendas.find()
  }
})


Template.agendaItem.events({
  'click .js-spinnerOnClick, tap .js-spinnerOnTouch': function () {
    console.log('%c spinner   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
  document.getElementById('spinner').classList.add('is-visible');
  },
  'click .js-openAgendaVClick, tap .js-openAgendaVTouch': function () {
    // document.getElementById('spinner').className += ' is-visible';
    console.log('%c normal   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');

      ViewsControl.go('agendaView', this._id)


  /*  Meteor.setTimeout(function () {
      ViewsControl.go('agendaView', this._id)
    }, 1)*/

  }
})
