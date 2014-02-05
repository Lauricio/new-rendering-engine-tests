sm = {};
Session.set("checker", "checked");

Template.hello2.rendered = function () {
  console.log("%c Rendered:    hello2    ",  "background: #2980b9; color: white; font-weight:bold; ", this.data);


  var contentEl = document.getElementById('content');
  var content = new ionic.views.SideMenuContent({
    el: contentEl
  });


  var leftMenuEl = document.getElementById('menu-left');
  var leftMenu = new ionic.views.SideMenu({
    el: leftMenuEl,
    width: 270
  });

  var rightMenuEl = document.getElementById('menu-right');
  var rightMenu = new ionic.views.SideMenu({
    el: rightMenuEl,
    width: 270
  });

  var menuListEl = document.getElementById('scrolling');
  var menuList = new ionic.views.Scroll({
    el: menuListEl
  });

  // var modalEl = document.getElementById('modal-scroll');
  // var modalScroll = new ionic.views.Scroll({
  //   el: modalEl
  // });



  sm = new ionic.controllers.SideMenuController({
    content: content,
    left: leftMenu,
    right: rightMenu,
    dragThresholdX: 50,
  });

  $('body').addClass("platform-ios7");



};


Template.ionscroller.rendered = function () {
  console.log("%c Rendered:    iscroll    ",  "background: #2980b9; color: white; font-weight:bold; ", this.data);
  /*
   Ionic Scroll + List
   */
  // var contentScrollDOM = document.getElementById('main-scroll');
  // var contentScroll = new ionic.views.Scroll({
  //   el: contentScrollDOM
  // });

  // var contentListDOM = document.getElementById('main-list');
  // var contentList = new ionic.views.ListView({
  //   el: contentListDOM
  // });

  /*
    iscroller
   */
  
  // var myScroll = new IScroll('#main-scroll', {
  //     mouseWheel: true,
  //     scrollbars: true
  // });

};



Template.hello2.checked = function () {
  return Session.get("checker");
};


  Template.hello2.events({
    'click #plus' :function () {
      Session.set("checker", Random.id())
    },
    'click #toggle-left-menuClick, tap #toggle-left-menuTouch' :function () {
      sm.toggleLeft();
    },
    'click #toggle-right-menuClick, tap #toggle-right-menuTouch' :function () {
      sm.toggleRight();
    },
      'click #insertAlertClick, tap #insertAlertTouch' :function () {
    Meteor.call('createAlert');
  },
    'click #updateAlerts' :function () {
    Meteor.call('updateAlerts');
  },
 
        'touchmove #main-backdrop': function (e) {
               e.preventDefault();
               // alert("tap");
               // alert("move");
                // e.stopPropagation();
             }
  });
// 

Template.mainModal.helpers({
  views: function () {
    return AppViews.find()
  },
  visible: function () {
    return Session.equals('mainViewVisible', true) ? 'is-visible': '';
  }
})

Template.speakerView.helpers({
  speaker: function () {
    return Speaker.findOne({_id: this.itemId});
  }
});

Template.agendaView.helpers({
  agenda: function () {
    return Agendas.findOne({_id: this.itemId});
  }
})

Template.mainModal.events({
  // 'webkitTransitionEnd #mainModal': function (e) {
  //         // alert("END")
  //         Session.set("hideOverflow", true);
  // },
  'click #test-overflow-modalClick, tap #test-overflow-modalTouch': function () {
         Session.equals('hideOverflow', true) ? Session.set("hideOverflow", false) : Session.set('hideOverflow', true);
  },
  'click #close-modalClick, tap #close-modalTouch' :function () {
    Session.set('mainViewVisible', false)
    },
  'click .js-closeViewClick, tap .js-closeViewTouch'  : function (e, t) {
      ViewsControl.back(this._id)
  },
  'click .js-closeMainModalClick, tap .js-closeMainModalTouch': function () {
      Session.set('mainViewVisible', false)
  }
})
