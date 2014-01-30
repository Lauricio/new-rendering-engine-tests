sm = {};
Session.set("checker", "checked");

Template.hello.rendered = function () {
  console.log("%c Rendered:    hello    ",  "background: #2980b9; color: white; font-weight:bold; ", this.data);


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

Session.set("output", "unset")





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
  var contentScrollDOM = document.getElementById('main-scroll');
  var contentScroll = new ionic.views.Scroll({
    el: contentScrollDOM
  });

  var contentListDOM = document.getElementById('main-list');
  var contentList = new ionic.views.ListView({
    el: contentListDOM
  });

  /*
    iscroller
   */
  
  // var myScroll = new IScroll('#main-scroll', {
  //     mouseWheel: true,
  //     scrollbars: true
  // });

};


// Template.agendaItem.rendered = function () {
//   console.log("%c Rendered:    agendaItem    ",  "background: #2980b9; color: white; font-weight:bold; ", this.data);
// };

Template.hello.checked = function () {
  return Session.get("checker");
};

// Template.hello.created = function () {
//   Meteor.defer(function () {
//     console.log('created')

//     // var leftMenuElList = document.getElementById('menu-left-list');
//     // var list = new ionic.views.ListView({
//     //   el: leftMenuElList
//     // });



//     var contentEl = document.getElementById('content');
//     var content = new ionic.views.SideMenuContent({
//       el: contentEl
//     });

//     var leftMenuEl = document.getElementById('menu-left');
//     var leftMenu = new ionic.views.SideMenu({
//       el: leftMenuEl,
//       width: 270
//     });

//     var rightMenuEl = document.getElementById('menu-right');
//     var rightMenu = new ionic.views.SideMenu({
//       el: rightMenuEl,
//       width: 270
//     });

//     sm = new ionic.controllers.SideMenuController({
//       content: content,
//       left: leftMenu,
//       right: rightMenu
//     });

//     $('body').addClass("platform-ios7");

//   })}

UI.body.events({
    'tap #close-modal' :function () {
      alert("close!")
        $( "#mainModal" ).removeClass( "is-visible" );
        // StatusBar.show();
    }
});

  Template.hello.events({
    'click #plus' :function () {
      Session.set("checker", Random.id())
  },
  //   'click #plus, tap #plus' :function () {
  //     alert("hh")
  //     Session.set("checker", Random.id())
  // },
    'click #toggle-left-menuClick, tap #toggle-left-menuTouch' :function () {
      sm.toggleLeft();
  },
      'click #toggle-right-menuClick, tap #toggle-right-menuTouch' :function () {
      sm.toggleRight();
  },
      'tap #open-modal' :function () {
        $( "#mainModal" ).addClass( "is-visible" );
        // StatusBar.hide();
    },


      'click #close-modal' :function () {
            $( "#mainModal" ).removeClass( "is-visible" );
            // StatusBar.show();
        }


  // ,
  //   'click .list' :function () {
  //     sm.close();
  // }
  });