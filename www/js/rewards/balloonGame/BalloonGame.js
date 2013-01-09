/*global require, Media, define,_,Backbone*/

define(
  [
    'marionette',
    'views/PickableListView',
    'core/controllers/audio'
  ],
  function (Marionette, PickableListView, audioController) {
    

    var BalloonView = Marionette.ItemView.extend({

      tagName : 'div',

      className : 'pickable-item',

      events : {
        'mousedown .pickable'  : 'onDown',
        'touchstart .pickable' : 'onDown',
        'mouseup .pickable'    : 'onSelect',
        'touchend .pickable'   : 'onSelect'
      },

      template : _.template("<div class='pickable'> <canvas></canvas> </div>"),

      onRender : function () {
        var img = document.getElementById('balloon-greyscale');
        this.canvas = this.$('canvas')[0];
        this.canvas.width = this.canvas.height = 200;
        this.context = this.canvas.getContext('2d');
        this.context.fillStyle = this.model.toString();
        this.context.fillRect(0, 0, 200, 200);
        this.context.globalCompositeOperation = 'darker';
        this.context.drawImage(img, 0, 0, 200, 200);
      },
      onSelect : function (evt) {
      },
      onDown   : function (evt) {
        this.$el.unbind();
        require('application').vent.trigger('pickable:click', this);

        audioController.play('actions', 'balloon-pop');

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var img = document.getElementById('cloud');
        this.context.drawImage(img, 0, 0, 200, 200);
        this.$el.addClass('transparent');
      },
      hide     : function () {
        this.$el.hide();
      }
    });

    var BalloonGame = PickableListView.extend({
      itemView     : BalloonView,
      initialize   : function () {
        this.$el.addClass('reward balloon');
        require('application').vent.on('pickable:click', this.onChildClick, this);
      },
      onClose      : function () {
        require('application').vent.off('pickable:click', this.onChildClick, this);
      },
      onChildClick : function (childView) {
        childView.popped = true;
        var allPopped = true;
        for (var child in this.children) {
          allPopped = allPopped && this.children[child].popped;
        }
        if (allPopped) require('application').vent.trigger('reward:completed');
      }
    });

    return BalloonGame;
  });
