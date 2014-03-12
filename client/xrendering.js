Meteor.startup(function () {
  
  
  var appOpened = new Date();


  });


observeNewAlerts = function  () {

  // console.log('%c OBESERVE INSIDE   ',  'background: #BD4F7A; color: white; padding: 1px 15px 1px 5px;');
  
      var appOpened = new Date();
      var lastViewedAlert = ""; //XXX fails when theres no profile
      // console.log('%c lastViewedAlert   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', lastViewedAlert);

      var alertsCursor = Alerts.find(
        {
          lifespan : {$gt: appOpened}, 
          readBy: { $not: { $exists: true } },
          createdAt: {$gt: lastViewedAlert }
        }, 
        {
          sort: { createdAt: -1} 
        });



      alertsCursor.observe({
        addedAt: function (doc, atIndex, before) {
            if (Session.equals("currentAlert", "") ) {

              Session.set("currentAlert", doc._id);

            }
        }
      });
}

/*

SubscriptionsReady
SubscriptionsReady.confirm();

 */

ConfirmSubscriptions = function () {
   if ( Session.equals("userReadAlertsReady", true) && Session.equals("userDataReady", true) && !Session.equals("alertsObeserving", true) ) {
        // console.log('%c CONFIRM   ',  'background: #BD4F7A; color: white; padding: 1px 15px 1px 5px;');
       Session.set("alertsObeserving", true);
       observeNewAlerts();
   } else {
    return 
   }
}


Template.announcement.helpers({
  alerts : function () {

    var alertsCursor = Alerts.find({}, {sort: { createdAt: -1}});

    return alertsCursor;
  }
});



Template.notifications.helpers({
  notifications : function () {

    return Notifications.find({}, {sort: { created: -1}});
  }
});


  Handlebars.registerHelper('ifNotificationType', function (type) {
    if (type == "alert")  {

      return Template.alertNotification;
    } else {
      return Template.otherNotification;
    }
  });

  Session.set("radius", 50);









Template.announcement.events({
  'click #deleteAlert' : function () {
     Alerts.remove({'_id' : this._id});
     Meteor.call('removeNotification', this._id);
  },
    'click #updateAlert' : function () {
      Alerts.update({_id: this._id}, {$inc: {readCount: 1}});
  }
});

Template.notifications.events({
  'click #deleteNotification' : function (e) {
     Notifications.remove({'_id' : this._id});
     Meteor.call('removeAlert', this.createdBy);
  },
  'click #openAlertNotification' : function (e) {
      Session.set("currentAlert", this.createdBy);
      Session.set("alertModal", "is-open");
  }
});


Meteor.methods({
  removeNotification: function(id) {
    Notifications.remove({'createdBy' : id});
  },
  removeAlert: function(createdBy) {
    Alerts.remove({'_id' : createdBy});
  }
});



Template.modal.alert = function () {
  var alertsCursor = Alerts.findOne({_id: Session.get("currentAlert")});

  /* watches for deleted alerts and closes the modal */

  if (alertsCursor === undefined) {
    Session.set("currentAlert", "");
    // Session.set("alertModal", "");
  }

  return alertsCursor;
};

  Template.modal.visible = function () {
    return Session.equals("currentAlert", "") || Session.equals("currentAlert", undefined) ? "" : "is-open";
  };




Template.modal.events({
  'click #closeAlertModal' :function () {
    // $( "#modal-7" ).removeClass( "is-open" );
    // Session.set("alertModal", "");

    Session.set("currentAlert", "");

    var self = this;

    if (Meteor.user() && Meteor.user().lastViewedAlert ) {

      if ( self.createdAt > Meteor.user().lastViewedAlert ) {
        console.log('%c last viewed NEW   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
        // Meteor.users.update({ _id: Meteor.userId() },{$set: { lastViewedAlert: new Date() }  } );

        Meteor.users.update({_id: Meteor.userId()}, { $set: { lastViewedAlert: self.createdAt }} );

        // Meteor.users.update({_id: Meteor.userId()}, { $set: {profile: { lastViewedAlert: self.createdAt } }} );
      }
    } else {
      console.log('%c Else update viewed   ',  'background: #BD4F7A; color: white; padding: 1px 15px 1px 5px;');
        Meteor.users.update({_id: Meteor.userId()}, { $set: { lastViewedAlert: self.createdAt }} );

        // Meteor.users.update({_id: Meteor.userId()}, { $set: {profile: { lastViewedAlert: self.createdAt } }} );

      // Meteor.users.update({ _id: Meteor.userId() }, 
      //   { $set: { lastViewedAlert: self.createdAt }}, function(err, num){
      //     console.log('%c err   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', err);
      //     console.log('%c END err   ',  'background: #FF9900; color: white; padding: 1px 35px 1px 5px;');
      //     console.log('%c num   ',  'background: #B3CC57; color: white; padding: 1px 15px 1px 5px;', num);
      //     console.log('%c END num   ',  'background: #B3CC57; color: white; padding: 1px 35px 1px 5px;');
      // } );

      // Meteor.users.update({ _id: Meteor.userId() },{$set: { lastViewedAlert: new Date() }  } );

    }

    

    /* Checks if user has already read the alert */
    if ( lodash.findIndex(self.readBy, { 'user': Meteor.userId() }) === -1) {
      Alerts.update({_id: self._id}, {$inc: {readCount: 1}, $push: {readBy: {user: Meteor.userId(), readAt: new Date()}}});
      // Alerts.update({_id: this._id}, {$inc: {readCount: 1}, $addToSet: {readBy: Meteor.userId() }});
    };
    
    
  },
  'click .md-overlay' :function () {
    // $( "#modal-7" ).removeClass( "is-open" );
    // Session.set("alertModal", "");
    Session.set("currentAlert", "");
  }
});




