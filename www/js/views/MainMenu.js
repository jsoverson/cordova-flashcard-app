/*global require,define, Backbone*/

define(['marionette', 'underscore'], function (Marionette, _) {
  "use strict";

  var MainMenu = Marionette.ItemView.extend({

    tagName      : 'div',

    id           : 'main-menu',

    template     : _.template('<div><button class="start btn btn-large btn-info">Start!</button</div>'),

    events       : {
      'click .start'      : 'onStartClick',
      'mousedown .start'  : 'onSelect',
      'touchstart .start' : 'onSelect',
      'mouseup .start'    : 'onStartClick',
      'touchend .start'   : 'onStartClick'
    },

    onStartClick : function () {
      require('application').newGame();
    },

    onUnselect   : function () {},
    onSelect     : function () {}
  });

  return MainMenu;
});
