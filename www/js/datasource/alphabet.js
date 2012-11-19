/*global define, Backbone, _*/

define(['backbone', 'underscore'], function (Backbone, _) {
  "use strict";

  var alphabet = new Backbone.Collection();

  var charCodeStart = 65;

  _(26).times(function(index) {
    var letter = String.fromCharCode(charCodeStart + index);
    alphabet.add({
      type   : 'letter',
      id     : letter,
      letter : letter,
      image : ''
    });
  });

  alphabet.className = 'alphabet text';

  return alphabet;
});
