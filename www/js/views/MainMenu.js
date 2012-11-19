/*global require,define, Backbone*/

define(['marionette'], function (Marionette) {
  "use strict";

  var MainMenu = Marionette.ItemView.extend({
    tagName      : 'div',
    id           : 'main-menu',
    template     : '#main-menu',

    events       : {
      'click .start'      : 'onStartClick',
      'mousedown .start'  : 'onSelect',
      'touchstart .start' : 'onSelect',
      'mouseup .start'    : 'onStartClick',
      'touchend .start'   : 'onStartClick'
    },

    onStartClick : function (evt) {
      require('application').newGame();
    },

    onUnselect   : function (evt) {
    },

    onSelect     : function (evt) {
    }
  });

  return MainMenu;
});
