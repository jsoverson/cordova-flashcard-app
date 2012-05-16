/*global define*/

define([], function () {
  "use strict";

  var MainMenu = Backbone.Marionette.ItemView.extend({
    events : {
      'click .start' : 'onStartClick',
      'mousedown'  : 'onSelect',
      touchstart : 'onSelect',
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
      evt.preventDefault();
    },
    onSelect : function(evt) {
      evt.preventDefault();
    }
  });

  return MainMenu;
});
