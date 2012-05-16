/*global define*/

define(['application/PickableItem'], function (PickableItem) {
  "use strict";

  var PickableList = Backbone.Collection.extend({
    model : PickableItem,
    initialize : function(){
    }
  });

  return PickableList;
});
