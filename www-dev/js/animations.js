/*global define, Media, document, window*/
/*jshint expr:true, loopfunc:true*/

define(
  [
    'zepto',
    'animations/fireworks/Fireworks',
    'animations/starburst/Starburst',
    'core/controllers/audio'
  ],
  function ($, Fireworks, Starburst, audioController) {
    "use strict";

    var canvas, context;

    $(function () {
      canvas = document.getElementById('canvas');
      context = canvas.getContext('2d');
      resetDimensions();
      $(window).on('resize orientationchange', resetDimensions);
    });

    function resetDimensions() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    return {
      starburst : function () {
        var burst = new Starburst(canvas);
        setTimeout(burst.stop, 4000);
      },

      fireworks : function () {
        var display = new Fireworks(canvas);
        var i = 7;

        while (i--) {
          setTimeout(function () {
              display.launch({
                pos       : [window.innerWidth / 2, window.innerHeight],
                vel       : [Math.random() * 6 - 3, -(Math.random() * 5) - 12],
                hue       : Math.random() * 255,
                onExplode : function () {
                  audioController.play('action', 'firework', true);
                }
              });
            },
            (Math.random() * 2) * 1000
          );
        }
      }
    };
  }
);
