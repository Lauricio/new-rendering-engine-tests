sm = {};

Template.hello.created = function () {
  Meteor.defer(function () {
    console.log('created')

    var leftMenuElList = document.getElementById('menu-left-list');
    var list = new ionic.views.ListView({
      el: leftMenuElList
    });



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

    sm = new ionic.controllers.SideMenuController({
      content: content,
      left: leftMenu,
      right: rightMenu
    });

    $('body').addClass("platform-ios7");

  })}


  Template.hello.events({
    'click #toggle-left-menu' :function () {
      sm.toggleLeft();
  },
      'click #toggle-right-menu' :function () {
      sm.toggleRight();
  },
      'click #open-modal' :function () {
        $( "#mainModal" ).addClass( "is-visible" );
        StatusBar.hide();
    },
      'click #close-modal' :function () {
        $( "#mainModal" ).removeClass( "is-visible" );
        StatusBar.show();
    }


  // ,
  //   'click .list' :function () {
  //     sm.close();
  // }
  });