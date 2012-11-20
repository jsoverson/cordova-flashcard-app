/*global define, window, Media*/

define([], function () {
  "use strict";

  var audioController = {

    audioBasePath : 'audio/',

    extension : '.mp3',

    prepare : function (type, sound, extension) {
      if (window.Media) {
        //Allow cycling of failures / customized Success
        if (type === 'failure') sound = getFailureSound();
        var audioFile = this.getAudioFile(type, sound, extension);
        return getMediaObject(audioFile);
      }
      return null;
    },

    play : function (type, sound, extension) {
      var media = this.prepare(type, sound, extension);
      if (media) media.play();
    },

    getAudioFile : function (type, sound,extension) {
      var typePath = this.getTypePath(type);
      return typePath + '/' + sound + (extension || this.extension);
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
