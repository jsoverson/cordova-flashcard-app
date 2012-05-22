/*global define, Media*/

define(
  [
    'animations/fireworks/Fireworks',
    'animations/starburst/Starburst'
  ],
  function (Fireworks, Starburst) {
    "use strict";

    var canvas,context;

    $(function(){
      canvas = document.getElementById('canvas');
      context = canvas.getContext('2d');
      resetDimensions();
      $(window).on('resize',resetDimensions);
    });

    function resetDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    return {
      starburst : function() {
        var burst = new Starburst(canvas);
        setTimeout(burst.stop,4000)
      },
      test : function() {
        context.fillStyle = 'red';
        context.fillRect(50,50,100,100);
      },
      fireworks : function() {
        var display = new Fireworks(canvas);
        var i = 7,pop;

        try {
          pop = new Media('audio/pop.mp3',function() {},
            function(err) {console.log("playAudio():Audio Error: "+err);}
          );
        } catch(e) {}

        while (i--) {
          setTimeout(function(){
              display.launch({
                pos : [window.innerWidth / 2, window.innerHeight],
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
