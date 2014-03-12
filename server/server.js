

 Meteor.publish("userReadAlerts", function () {
   // return  this.userId ? Alerts.find() : Alerts.find({},{fields:{'readstate' : 0}});
   return  Alerts.find( {}, {fields: {readBy: {$elemMatch: {user: this.userId}}}});
 });

 Meteor.publish("alerts", function () {
   return  Alerts.find({}, {fields: {readBy: 0}});
 });

  Meteor.publish("agenda", function () {
   return  Agenda.find({});
 });

Meteor.users.allow({update: function () { return true; }});


 Meteor.publish("forms", function () {
   return  Forms.find({});
 });

 Meteor.publish("notifications", function () {
   return  Notifications.find();
 });

 Meteor.publish("userData", function () {
    return Meteor.users.find({_id: this.userId},
        {fields: {'unreadNotifications': 1, 'lastViewedAlert': 1}});
});

 Facts.setUserIdFilter(function(userId){
  return true;
 })

 Meteor.methods({

  createAlert: function () {
    var type = "alert";
    var title = "Alert Title";
    var message = Random.id() + "  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, quisquam, voluptatum, quos rem cupiditate sequi vitae repellat corrupti hic placeat sint doloribus non minima id expedita fugiat itaque. Ut, temporibus.";
    var personal = 0;
    var userId = "";

     
      Alerts.insert({
        createdAt: new Date(),
        lifespan: moment().add('seconds', 10060).toDate(),
        title: title,
        message: message,
        readBy:[],
        readCount: 0
      }, function(err, _id){
        if(err) {
          console.log(err);
        } else {
          createNotification(type, title, message, _id, personal, userId);
        }
      });



  },
  updateAlerts: function() {
    Alerts.update({}, {$inc: {readCount: 1}}, {multi: true});
 },
  removeNotification: function(id) {
    Notifications.remove({'createdBy' : id});
 },
  removeAlert: function(createdBy) {
    Alerts.remove({'_id' : createdBy});
  },
  deleteAgenda: function () {
    Agenda.remove({})
  }
})




 /**
  * Creating notifications for all registered users
  * @param  {string} type      Notification Type (alert, message etc.)
  * @param  {string} title     Notification Title
  * @param  {string} message      Notification Content
  * @param  {string} createdBy ID of a module that creates notification
  */
 createNotification = function(type, title, message, createdBy, personal, userId ) {

  Notifications.insert({
    personal: personal || 0,
    type: type,
    createdBy: createdBy,
    title: title,
    message: message.truncate(),
    createdAt: new Date(),
    userId: userId || "",
    readBy: [],
    readCount : 0
  }, function(err){
      if(err) {
        console.log(err);
      } else {
        Meteor.users.update({},
                       {$inc: {unreadNotifications: 1}},
                       {multi: true});
      }
  });
}