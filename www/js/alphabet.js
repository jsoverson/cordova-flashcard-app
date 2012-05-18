/*global define*/

define([], function () {
  "use strict";

  var alphabet = new Backbone.Collection();

  var charCodeStart = 65;

  _(26).times(function(index) {
    var letter = String.fromCharCode(charCodeStart + index)
    alphabet.add({
      id     : letter,
      letter : letter,
      image : ''
//      image  : 'img/alphabet/default.png'
    });
  })

  return alphabet;
});
