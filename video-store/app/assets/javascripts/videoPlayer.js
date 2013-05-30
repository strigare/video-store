
var videoPlayer = (function(){
  
  var me;

  var player = {

    initialize : function(videoUrl){

      me.video = $('#video')[0];

      me.video.src =  videoUrl;
      me.video.load();

      me.controls = $('#controls');
      me.playControl = $('#play');
      me.progressControl = $('#progress');
      me.progressHolder = $('#progress_box');
      me.playProgressBar = $('#play_progress');
      me.currentTimeDisplay = $('#current_time_display');
      me.durationDisplay = $('#duration_display');
      me.volumeControl = $('#volume');
      me.volumeDisplay = $('#volume_display');
      me.fullScreenControl = $('#full_screen');

      me.showController();
      $(me.video).width( $('#video_box').width() );
      me.positionController();

      me.playControl.click( function(){
          if (me.video.paused) {
            me.playVideo();
          } else {
            me.pauseVideo();
          }
      });

      me.volumeControl.mousedown( function(){
        me.blockTextSelection();
        document.onmousemove = function(e) {
          me.setVolume(e.pageX);
        }
        document.onmouseup = function() {
          me.unblockTextSelection();
          document.onmousemove = null;
          document.onmouseup = null;
        }
      });

      me.volumeControl.mouseup( function(e){
        me.setVolume(e.pageX);
      });

      me.updateVolumeDisplay();

      me.fullScreenControl.click( function(){
        if (!me.videoIsFullScreen) {
          me.fullScreenOn();
        } else {
          me.fullScreenOff();
        }
      });
    },

    playVideo : function(){
      me.video.play();
      me.playControl.attr('class', 'pause control');
      me.trackPlayProgress();
    },

    pauseVideo : function(){
      video.pause();
      me.playControl.attr('class','play control');
      me.stopTrackingPlayProgress();
    },

    positionController :function(){

      me.controls.css('top', (me.video.offsetHeight - me.controls[0].offsetHeight) + 'px');
      me.controls.css('left', '0px');
      me.controls.width(me.video.offsetWidth);
      me.sizeProgressBar();
    },

    showController: function(){
      me.controls.css('display', 'block');
    },
    sizeProgressBar: function(){
      me.progressControl.width( me.controls[0].offsetWidth - 125);
      me.progressHolder.width(me.progressControl[0].offsetWidth - 80);
      me.updatePlayProgress();
    },

    trackPlayProgress: function(){
      me.playProgressInterval = setInterval(function(){me.updatePlayProgress()}, 33);
    },

    stopTrackingPlayProgress: function(){
      clearInterval(me.playProgressInterval);
    },

    updatePlayProgress: function(){
      me.playProgressBar.width((me.video.currentTime / me.video.duration) * (me.progressHolder[0].offsetWidth - 2));
      me.updateTimeDisplay();
    }, 

    updateTimeDisplay: function(){
      me.currentTimeDisplay.html(me.formatTime(me.video.currentTime));
      if (me.video.duration) me.durationDisplay.html(me.formatTime(me.video.duration));
    },

    setVolume: function(clickX) {

      var newVol = (clickX - me.volumeControl.offset().left) / me.volumeControl[0].offsetWidth;
      if (newVol > 1) {
        newVol = 1;
      } else if (newVol < 0) {
        newVol = 0;
      }
      me.video.volume = newVol;
      me.updateVolumeDisplay();
    },

    // Unique to these controls.
    updateVolumeDisplay: function(){
      var volNum = Math.floor(me.video.volume * 6);
      for(var i=0; i<6; i++) {
        if (i < volNum) {
          me.volumeDisplay.children().eq(i).css('borderColor', '#fff');
        } else {
          me.volumeDisplay.children().eq(i).css('borderColor', '#555');
        }
      }
    },

    fullScreenOn: function(){
      me.videoIsFullScreen = true;
      me.videoOrigWidth = me.video.offsetWidth;
      me.videoOrigHeight = me.video.offsetHeight;

      me.video.style.width = window.innerWidth + 'px';
      me.video.style.height = window.innerHeight + 'px';
      me.video.style.position = 'fixed';
      me.video.style.left = 0;
      me.video.style.top = 0;
      me.controls.css('position', 'fixed');
      me.positionController();

      me.fullScreenControl.className = 'fs-active control';
    },

    fullScreenOff: function(){
      me.videoIsFullScreen = false;
      me.video.style.width = me.videoOrigWidth + 'px';
      me.video.style.height = me.videoOrigHeight + 'px';
      me.video.style.position = 'static';
      me.controls.css('position', 'absolute');
      me.positionController();
      me.fullScreenControl.attr('class', 'control');
    },

    blockTextSelection: function(){
      document.body.focus();
      document.onselectstart = function () { return false; };
    },

    unblockTextSelection: function(){
      document.onselectstart = function () { return true; };
    },

    // Return seconds as MM:SS
    formatTime: function(seconds) {
      var seconds = Math.round(seconds);
      var minutes = Math.floor(seconds / 60);
      minutes = (minutes >= 10) ? minutes : '0' + minutes;
      var seconds = Math.floor(seconds % 60);
      seconds = (seconds >= 10) ? seconds : '0' + seconds;
      return minutes + ':' + seconds;
    },
  }

  me = player;

  return {
    initialize: function(videoUrl){
      player.initialize(videoUrl);
    },

    pauseVideo : function(){
      player.pauseVideo();
    }

  };

})();