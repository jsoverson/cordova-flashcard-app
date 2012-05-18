/*global define*/

define(
  [
    'animations/fireworks/Fireworks'
  ],
  function (Fireworks) {
    "use strict";

    return {
      fireworks : function() {
        var display = new Fireworks(document.getElementById('canvas'));
        var i = 7,pop;

        try {
          pop = new Media('audio/pop.mp3',function() {},
            function(err) {console.log("playAudio():Audio Error: "+err);}
          );
        } catch(e) {}

        while (i--) {
          setTimeout(function(){
              display.launch({
                pos : [document.width / 2, document.height],
                vel : [Math.random() * 6 - 3, -(Math.random() * 5) - 12],
                hue : Math.random() * 255,
                onExplode : function(){pop && pop.play()}
              })
            },
            (Math.random() * 2) * 1000
          )
        }
      }
    }
  }
);
