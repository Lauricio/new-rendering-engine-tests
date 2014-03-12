var setheight = function  () {
      var height = window.innerHeight - 64;
      // document.body.style.height = window.innerHeight + "px";
    Session.set("contentHeight", height + "px");
    Session.set("fullheight", window.innerHeight + "px");
if (window) {
  if(window.innerHeight > window.innerWidth){
      console.log('%c land   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
      // $('head').append('<meta name="viewport" content="height=device-width,  initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=no">');

      // var viewport = document.querySelector("meta[name=viewport]");
      // console.log('%c viewport   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', viewport);
      // if (viewport) {
      // viewport.setAttribute('content', 'height=device-width,  initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=no');
    // }
  } else if (window.innerHeight < window.innerWidth) {
      console.log('%c port   ',  'background: #5D76DB; color: white; padding: 1px 15px 1px 5px;');
    // $('head').append('<meta name="viewport" content="height=device-height,  initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=no">');

    // var viewport = document.querySelector("meta[name=viewport]");
    //   console.log('%c viewport   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', viewport);
    // if (viewport) {
    //   viewport.setAttribute('content', 'height=device-height,  initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=no');
        
    // }


  }
}

} 

setheight();



window.onresize = function() {
  console.log('%c  window.innerHeight   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;',  window.innerHeight);
  setheight();
  // var mvp = document.getElementById('testViewport');
  //     mvp.setAttribute('content','height=device-height,  initial-scale=1, maximum-scale=1.0, minimum-scale=1, user-scalable=no');
  //     console.log('%c mvp   ',  'background: #FF9900; color: white; padding: 1px 15px 1px 5px;', mvp);
};

Handlebars.registerHelper("getHeight", function(key){
     return Session.get("contentHeight");
});

Handlebars.registerHelper("getFullHeight", function(key){
     return Session.get("fullheight");
});

 Template.hello.height = function () {
   return Session.get("contentHeight");
 };

 Template.hello.fullHeight = function () {
   return Session.get("fullheight");
 };