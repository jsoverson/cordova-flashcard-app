/*global define*/

define([], function () {
  "use strict";

  function Starburst(canvas) {
    var context = canvas.getContext('2d');
    var self = this
      , foregroundColor = {
          hue : ~~(Math.random() * 255)
        , saturation : 100
        , lightness : 50
        , alpha : 0
        }
      , dim = { width : canvas.width, height : canvas.height}
      , degree = (2 * Math.PI / 360)
      , circumference = 2 * Math.PI
      , rotation = degree / 60
      , center = [dim.width * .5, dim.height * .5]
      , radius = Math.sqrt(dim.width * dim.width + dim.height * dim.height)
      , rays = 20;

    this.getBackgroundColor = function() { return 'rgb(0,0,0)'; }
    this.getForegroundColor = function() {
      var color = foregroundColor;
      if (self.isStopping)      color.alpha = (self.ttl / self.totalTtl);
      else if (color.alpha < 1) color.alpha += .01;

      if (color.alpha > 1) return 'hsl(' + color.hue + ',' + color.saturation + '%,' + color.lightness + '%)'
      else                 return 'hsla(' + color.hue + ',' + color.saturation + '%,' + color.lightness + '%,' + color.alpha + ')'
    }

    this.animate = function() {
      if (!self.animating) {
        self.animating = true;
        animationLoop();
      }
    }

    function animationLoop() {
      dim.width = canvas.width;   // reset each loop in case we changed orientation
      dim.height = canvas.height;
      center = [dim.width * .5, dim.height * .5]
      self.clear();
      self.render();
      if (self.isStopping && --self.ttl < 0) self.animating = false;
      if (self.animating) requestAnimFrame(animationLoop);
      else self.clear()
    }

    this.clear = function() {
      context.fillStyle = self.getBackgroundColor();
      context.fillRect(0,0,dim.width,dim.height);
    }

    this.stop = function() {
      self.isStopping = true;
      self.ttl = self.totalTtl = 50;
    }

    var offset = 0;
    this.render = function() {
      context.fillStyle = self.getForegroundColor();
      context.beginPath();

      var spokeCount = rays * 2
        , length = radius * 1.5
        ,r1, r2, x, y;

      context.moveTo(center[0], center[1]);
      for (var i = 0; i < rays; i++){
        offset += rotation;
        r1 = offset + (i * 2 / spokeCount) * circumference;
        r2 = offset + ((i * 2 + 1) / spokeCount) * circumference;
        context.lineTo(length * Math.cos(r1),length * Math.sin(r1));
        context.lineTo(length * Math.cos(r2),length * Math.sin(r2));
        context.lineTo(center[0], center[1]);
      }
      context.fill();
    }

    this.animate();
  }

  return Starburst;
});
