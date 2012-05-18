/*global define, Backbone*/

define([], function () {
  "use strict";

  var MainMenu = Backbone.Marionette.ItemView.extend({
    events : {
      'click .start' : 'onStartClick',
      'mousedown .start'  : 'onSelect',
      'touchstart .start' : 'onSelect',
      'mouseup .start'    : 'onStartClick',
      'touchend .start'   : 'onStartClick'
    },
    tagName : 'div',
    id : 'main-menu',
    template : '#main-menu',
    onStartClick : function(evt) {
      require('application').newGame();
    },
    onUnselect : function(evt) {
    },
    onSelect : function(evt) {
    }
  });

  return MainMenu;
});
