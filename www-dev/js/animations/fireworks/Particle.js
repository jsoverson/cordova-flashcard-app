/*global define*/

define(['animations/fireworks/util'], function (util) {
  "use strict";

  var Particle = function(pos) {
    this.pos = pos;
    this.expired = false;
    this.acc = [0,0];
    this.gravity = [0, 0.01];
    this.ttl = ~~(Math.random() * 40) + 10;
  };

  Particle.prototype.launch = function(vel) {
    this.vel = vel || [0,0];
    return this;
  };

  Particle.prototype.update = function(){
    if (this.expired) return this;
    this.acc[0] += this.gravity[0];
    this.acc[1] += this.gravity[1];
    this.vel[0] += this.acc[0];
    this.vel[1] += this.acc[1];
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    if (--this.ttl <= 0) this.expired = true;

    return this;
  };

  return Particle;
});
