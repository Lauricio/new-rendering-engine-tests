Meteor.subscribe("alerts");
Meteor.subscribe("notifications");
Meteor.subscribe("forms");
Meteor.subscribe("agenda");



Session.set("userReadAlertsReady", false);
Session.set("userDataReady", false);
Session.set("alertsObeserving", false);


Meteor.subscribe("userReadAlerts", function(){
  Session.setDefault("currentAlert", "");
  // console.log('%c ALERTS Callback Ready   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
  Session.set("userReadAlertsReady", true);

  ConfirmSubscriptions();

});

Meteor.subscribe("userData", function(){
  // console.log('%c USER Callback Ready   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
  Session.set("userDataReady", true);
  ConfirmSubscriptions();
});



