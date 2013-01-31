/*global define */

define(
  [
    'application',
    'core/rewards/canvas/Item'
  ],
  function (app, RewardCanvasItem) {
    "use strict";

    var viewportWidth = window.innerWidth,
      viewportHeight = window.innerHeight,
      TwoPI = Math.PI * 2,

      velocitySkew = { x : 15, y : 20 },
      velocityConstant = {x : -8, y : -8 },

      pointerX = viewportHeight / 2,
      pointerY = viewportWidth / 2,
      pressed = false,

      radius = 20,
      energy = 100,
      particleCount = 50,
      particles = [];

    //testing
    var count = 0;

    var ColorBurst = RewardCanvasItem.extend({

      timer : 5,


      onRender : function () {
        if (this.canvas && this.context) {
          this.contextClear();
          this.createParticles();
          this.trigger('render:loop');
        }
      },

      createParticles : function () {
        for (var i = 0; i < particleCount; i++) {
          particles.push(new Particle());
        }
      },

      //For Opacity Handling
      _getEnergyRemaining : function (ttl, energy) {
        //20% wasted
        return ~~((ttl / energy ) * 80) / 100;
      },

      step : function () {
        for (var i = 0, len = particles.length; i < len; i++) {
          var particle = particles[i];

          particle.position.x += particle.velocity.x;
          particle.position.y += particle.velocity.y;

          particle.radius--; particle.ttl--;

          //recycle dead Particle
          if ((particle.radius) < 0 || particle.ttl < 0) {
            particles[i] = new Particle();
          }
        }
      },

      renderCanvas : function () {
        this.context.globalCompositeOperation = "source-over";

        //Reset Context
        this.context.fillStyle = "#000";
        this.context.fillRect(0, 0, viewportWidth, viewportHeight);

        for (var i = 0, len = particles.length; i < len; i++) {
          var particle = particles[i];

          this.context.beginPath();

          this.context.globalCompositeOperation = "darker";

          this.context.fillStyle = particle.fillStyle;

          this.context.arc(particle.position.x, particle.position.y, particle.radius, TwoPI, false);

          this.context.fill();
        }
      },

      onClose : function () {
        particles = [];
      },

      onWindowResize : function () {
        viewportWidth = window.innerWidth;
        viewportHeight = window.innerHeight;
      },

      onTouchStart : function(evt) {
        this.onMouseMove(evt);
      },

      onTouchMove : function(evt) {
        this.onMouseMove(evt);
      },

      onMouseMove : function (evt) {
        pointerX = evt.pageX - evt.target.offsetLeft;
        pointerY = evt.pageY - evt.target.offsetTop;
      }
    });

    var Particle = function () {
      this.position = {
        x : pointerX,
        y : pointerY
      };

      this.velocity = {
        x : velocityConstant.x + (Math.random() * velocitySkew.x),
        y : velocityConstant.y + (Math.random() * velocitySkew.y)
      };

      this.radius = radius + (Math.random() * 10);
      this.energy = energy + (Math.random() * 10);
      this.ttl = this.energy;
      this.fillStyle = '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    return ColorBurst;
  });
