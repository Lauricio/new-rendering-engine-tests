ViewsControl = {
  go: function (type, itemId) {
    document.getElementById('loader').classList.add('is-visible');
    // Session.set('spinnerOn', true)
    Meteor.setTimeout(function () {
    Session.set('mainViewVisible', true)
    AppViews.insert({type: type, itemId: itemId}, function (err) {
      if (err && AppViews.find().count() === 0)
        Session.set('mainViewVisble', false)
    })
    }, 1)
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


// Template.mainView.rendered = function () {
//   // Deps.autorun(function () {
    
//   // if (Session.equals('spinnerOn', true))
//   //   ViewsControl.go('agendaView', this._id)
//   // })



//   if (AppViews.find().count() === 0)
//     Session.set('mainViewVisible', false)
//   document.getElementById('mainView').addEventListener( 'webkitTransitionEnd', 
//       function( event ) { 
//         if (event.target.id === 'mainView') {
//           AppViews.remove({})
//           document.getElementById("loader").classList.remove('is-visible')
//         }
//       }, true );
// };

Template.mainView.helpers({
  views: function () {
    return AppViews.find()
  },
  visible: function () {
    return Session.equals('mainViewVisible', true) ? 'is-visible': '';
  }
})

Template.agendaView.helpers({
  agenda: function () {
    return Agendas.findOne({_id: this.itemId});
  }
})

Template.agendaView.helpers({
  agendas: function() {
    return Agendas.find({})
  }
})


Template.mainView.events({

  'click #test-overflow-modalClick, tap #test-overflow-modalTouch': function () {
         Session.equals('hideOverflow', true) ? Session.set("hideOverflow", false) : Session.set('hideOverflow', true);
  },
  'click #close-modalClick, tap #close-modalTouch' :function () {
    Session.set('mainViewVisible', false)
    },
  'click .js-closeViewClick, tap .js-closeViewTouch'  : function (e, t) {
      ViewsControl.back(this._id)
  },
  'click .js-closemainViewClick, tap .js-closemainViewTouch': function () {
      Session.set('mainViewVisible', false)
  }
})

Template.agendaView.rendered = function () {
  console.timeEnd("View Rendering");
  document.getElementById("loader").classList.remove('is-visible')
};


Template.agendaItem.events({
  'click .js-openAgendaVClick, tap .js-openAgendaVTouch': function() {
    console.time("View Rendering");
    ViewsControl.go('agendaView', this._id);
  }
})
