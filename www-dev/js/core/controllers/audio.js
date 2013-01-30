/*global define, window, Media*/

define([], function () {
  "use strict";

  var audioController = {

    audioBasePath : 'audio/',

    extension : 'mp3',

    currentStream : null,

    setAudioExtension : function(extension) {
      this.extension = extension;
    },

    prepare : function (type, sound) {
      if (window.Media) {
        //Stop Current Sound Playing
        if (this.currentStream) this.currentStream.stop();
        //Allow cycling of failures / customized Success
        if (type === 'failure') sound = getFailureSound();
        var audioFile = this.getAudioFile(type, sound);
        this.currentStream = getMediaObject(audioFile);
        return this.currentStream;
      }
      return null;
    },

    play : function (type, sound) {
      var media = this.prepare(type, sound);
      if (media){
        media.play();
      }
    },

    getAudioFile : function (type, sound) {
      var typePath = this.getTypePath(type);
      return typePath + '/' + sound + '.' + this.extension;
    },

    getTypePath : function (type) {
      return this.audioBasePath + type;
    }
  };

  //Private Media Methods
  //--------------------------

  function getMediaObject(audioFile) {
    return new Media(audioFile, mediaSuccess, mediaError, mediaStatus);
  }

  function getFailureSound() {
    var failures = ['hmm','uhoh','whoops'];
    var index = ~~(Math.random() * failures.length);
    return failures[index];
  }

  function mediaSuccess() {
    console.log("media success");
  }

  function mediaError(err) {
    console.log("media fail", err);
  }

  function mediaStatus(status) {
    console.log("media status", status);
  }

  return audioController;
})
;
