/*global define, requestAnimFrame*/


define(['animations/fireworks/Firework'], function (Firework) {
  "use strict";

  function Fireworks(canvas) {
    var self = this,
        fireworks = this.fireworks = [],
        context = canvas.getContext('2d');

//    canvas.width = window.innerWidth;
//    canvas.height = window.innerHeight;

    self.animate = function() {
      if (!self.animating) {
        self.animating = true;
        loop();
      }
    };

    function loop() {
      clearContext();
      if (drawFireworks()) {
        requestAnimFrame(loop);
      } else {
        context.fillStyle = 'black';
        context.fillRect(0,0,canvas.width,canvas.height);
        self.animating = false;
      }
    }

    function clearContext() {
      //context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = 'rgba(0,0,0,.3)';
      context.fillRect(0, 0, canvas.width, canvas.height);
    }

    function drawFireworks() {
      var i = fireworks.length, numExpired = 0;

      while(i--) {
        var firework = fireworks[i];
        if (firework.expired) numExpired++;
        else firework.update().render(context);
      }

      return numExpired < fireworks.length;
    }
  }

  Fireworks.prototype.launch = function(options){
    var firework = new Firework(options.pos,options.hue);
    firework.onExplode = options.onExplode;
    firework.launch(options.vel);
    this.fireworks.push(firework);
    this.animate();
  };

  return Fireworks;
});
