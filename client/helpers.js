Handlebars.registerHelper("showOutput", function(key){
     return Session.get("output");
});

Handlebars.registerHelper("hideOverflow", function(key){
     return Session.get("hideOverflow") ? 'hide-overflow' : 'show-overflow';
});

