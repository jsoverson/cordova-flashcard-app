/*global define, _,  _gaq, ENV, console*/
/*jshint loopfunc:true*/

define([], function () {
  "use strict";

  var trak = {
    event : function(category, action, label, value) {
      var args = _(arguments).toArray();
      args.unshift('_trackEvent');
      _gaq.push(args);
    },
    customVar : function(index, name, value, opt_scope) {
      var args = _(arguments).toArray();
      args.unshift('_setCustomVar');
      _gaq.push(args);
    },
    view : function(name) {
      _gaq.push(['_trackPageview',name]);
    }
  };

  if (ENV.DEV === true) {
    for (var method in trak) {
      if (trak.hasOwnProperty(method) && typeof trak[method] === 'function') {
        trak[method] = function() { console.log("TRAK : ", arguments); };
      }
    }
  }

  return trak;
});
