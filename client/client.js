Template.hello.created = function () {
  Meteor.defer(function () {
    console.log('created')

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

    var sm = new ionic.controllers.SideMenuController({
      content: content,
      left: leftMenu,
      right: rightMenu
    });


  })}