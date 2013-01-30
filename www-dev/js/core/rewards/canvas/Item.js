/*global require, define, document, requestAnimFrame*/

define([
  'marionette',
  'underscore',
  'core/controllers/audio',
  'core/controllers/shake',
  'views/Timer'
],

  function (Marionette, _, audioController, shakeController, Timer) {
    "use strict";

    var CanvasItem = Marionette.ItemView.extend({

      timer : 10,

      paused   : false,

      //not sure how fond of this i am
      template : _.template('<canvas id="main"></canvas><div class="timer"></div>'),

      constructor : function () {
        Marionette.ItemView.prototype.constructor.apply(this, arguments);
        this.on('render', this._onRender, this);
        this.on('close', this._onClose, this);
        this.on('render:loop', this._renderLoop, this);
        if (this.shakeCallback) {
          if (navigator.accelerometer) {
            //still flushing this out
            //shakeController.startWatching(_.bind(this.shakeCallback,this));
          }
        }
      },

      contextClear : function () {
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      },

      _startTimer : function () {

        var timer = new Timer({

          timer : this.timer,

          callback : function () {
            require('application').vent.trigger('reward:completed');
          }
        });

        this.$('.timer').html(timer.render().el);
      },

      _onClose : function () {
        shakeController.stopWatching();
        this.contextClear();
      },

      _onRender : function () {
        this.canvas = this.$("canvas#main")[0];
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext('2d');
        this._bindEvents();
        this._startTimer();

        //Only Start The Animation Cycle if step if defined
        if (this.step) {
          this._renderLoop();
        }
      },

      _bindEvents : function () {
        window.addEventListener('resize', this._windowResizeHandler, false);

        this.canvas.addEventListener('mousemove', _.bind(this._onMouseMove, this), false);
        this.canvas.addEventListener('mousedown', _.bind(this._onMouseToggle, this), false);
        this.canvas.addEventListener('mouseup', _.bind(this._onMouseToggle, this), false);

        this.canvas.addEventListener('touchstart', _.bind(this._onTouchStart, this), false);
        this.canvas.addEventListener('touchmove', _.bind(this._onTouchMove, this), false);

        //Debugging
        window.addEventListener('keydown', _.bind(function (evt) {
          switch (evt.which) {
            case 32 : //space
              this._pauseContext();
              break;
            case 83 : //s
              this._displayStep();
              break;
            case 27 : //esc
              this.contextClear();
              break;
          }
        }, this));
      },

      _onMouseMove : function(evt) {
        if (this.onMouseMove) this.onMouseMove(evt);
      },

      _onTouchStart : function(evt) {
        if (this.onTouchStart) this.onTouchStart(evt);
      },

      _onMouseToggle : function(evt) {
        if (this.onMouseToggle) this.onMouseToggle(evt);
      },

      _onTouchMove : function(evt) {
        if (this.onTouchMove) this.onTouchMove(evt);
      },

      _windowResizeHandler : function () {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        if (this.onWindowResize) this.onWindowResize();
      },

      _pauseContext : function () {
        this.paused ^= true;
      },

      _displayStep : function () {
        this.step();
      },

      _renderCanvas : function () {
        if (this.renderCanvas) {
          this.renderCanvas();
        }
      },

      _renderLoop  : function () {
        if (!this.paused) this.step();

        this._renderCanvas();

        requestAnimFrame(_.bind(this._renderLoop, this));
      }
    });

    return CanvasItem;
  });
