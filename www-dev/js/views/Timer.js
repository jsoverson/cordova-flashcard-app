/*global require, define, document*/

define([
  'marionette',
  'underscore'
],

  function (Marionette, _) {
    "use strict";

    var REDCOLOR = "#ff0000", BLUECOLOR = "#aed8ed";

    var TimerView = Marionette.ItemView.extend({

      timer : 10,

      countUp : 0,

      angleStart : 0,

      angleEnd : 0,

      //not sure how fond of this i am
      template : _.template('<canvas id="timer" width="100" height="100"></canvas>' +
                            '<span id="count"></span>' +
                            '</div>'),

      ui : {
        "count" : "#count"
      },

      initialize : function() {
        if (this.options.timer) {
          this.timer = this.options.timer;
        }
        this.currentCount = this.timer;
      },

      onRender : function() {
        this.canvas = this.$("#timer")[0];
        this.context = this.canvas.getContext('2d');

        this._renderCanvas();
        this._renderLoop();
      },

      _updateAngleStart : function() {
        this.angleStart = this.angleEnd;
      },

      _updateCounter : function() {
        if (this.currentCount <= 5) {
          this.ui.count.css('color', REDCOLOR);
          this.context.strokeStyle = REDCOLOR;
        } else {
          this.context.strokeStyle = BLUECOLOR;
        }
        this.ui.count.text(this.currentCount);
      },

      _handleCallback : function() {
        if (this.options.callback && _.isFunction(this.options.callback)) {
          this.options.callback();
        }
        clearInterval(this._countDownInterval);
        this.close();
      },

      _step : function () {
        this.angleEnd = (Math.PI * (this.countUp * 2 / this.timer));
        this.currentCount = this.timer - this.countUp;
      },

      _renderCanvas : function() {
        this.context.lineWidth = 7;
        this.context.lineCap = 'square';

        this.context.beginPath();
        this.context.arc(50, 50, 30, this.angleStart , this.angleEnd, false);
        this.context.stroke();

        this._updateAngleStart();
        this._updateCounter();

        if (++this.countUp > this.timer + 1) {
          this._handleCallback();
        }
      },

      _renderLoop : function () {
        this._step();

        this._renderCanvas();

        //1 sec tick
        if (!this._countDownInterval) {
          this._countDownInterval = setInterval(_.bind(this._renderLoop,this), 1000);
        }
      }

    });

    return TimerView;
  });