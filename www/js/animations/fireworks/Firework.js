/*global define*/

define(['animations/fireworks/Particle','animations/fireworks/util'], function (Particle, util) {
  "use strict";

  var Firework = function(pos,hue) {
    this.pos = pos;
    this.hue = hue;
    this.exploded = false;
    this.power = 5;
    this.explosionSize = 50;
    this.particles = [];
    this.gravity = [0,.01];
    this.size = 4;
    this.halfSize = ~~(this.size / 2);
    this.onExplode = function(){};
    this.ttl = undefined;
  }

  Firework.prototype.launch = function(vel, acc) {
    this.vel = vel || [0,0];
    this.acc = acc || [0,0];
    return this;
  }

  Firework.prototype.update = function(){
    if (this.exploded) {
      this.cleanupParticles();
      for (var i = 0, l = this.particles.length; i < l; i++) !this.particles[i].expired && this.particles[i].update();
    } else {

      this.acc[0] += this.gravity[0];
      this.acc[1] += this.gravity[1];
      this.vel[0] += this.acc[0];
      this.vel[1] += this.acc[1];
      this.pos[0] += this.vel[0];
      this.pos[1] += this.vel[1];

      if (this.ttl !== undefined && Math.abs(this.vel[1]) < 1) this.ttl = ~~(Math.random() * 20);
      if (--this.ttl <= 0) this.explode();
    }
    return this;
  }

  Firework.prototype.render = function(context) {
    context.fillStyle = 'hsl(' + this.hue + ',100%,50%)';
    if (this.exploded) {
      for (var i = 0, l = this.particles.length; i < l; i++) {
        if (this.particles[i].expired) continue;
        var particle = this.particles[i];
        context.fillRect(particle.pos[0] - 2,particle.pos[1] - 2, 4,4);
      }
    } else {
      context.fillRect(
        this.pos[0] - this.halfSize,
        this.pos[1] - this.halfSize,
        this.size,
        this.size
      )
    }
  }

  Firework.prototype.explode = function() {
    if (this.exploded) return this;
    this.onExplode();
    this.exploded = true;
    var power = this.power, halfPower = power / 2, velocity, numParticles = this.explosionSize;
    while (numParticles--) {
      velocity = util.fromAngle((numParticles / this.explosionSize) * 2 * Math.PI, this.power * (100 - (Math.random() * 80))/100);
      this.particles.push(new Particle([this.pos[0],this.pos[1]],this.hue).launch(velocity))
    }
  }

  Firework.prototype.cleanupParticles = function() {
    var length = this.particles.length, numExpired = 0;
    while (length--) {
      if (this.particles[length].expired) numExpired++;
    }
    if (this.particles.length === numExpired && this.exploded) {
      this.expired = true;
    }
  }

  return Firework
});

