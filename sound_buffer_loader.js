/*
* This script is retrived from https://www.html5rocks.com/en/tutorials/webaudio/intro/
* By Boris Smus on October 14th, 2011
* The script is slightly modified to serve the purpose of this particular project
*/

function BufferLoader(context, urlList, callback) {
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
  this.class_sound_gain = [];  // Add an array of gain for all sound been played
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length) {
          // Play all sound but only make the background sound to be audiable initially
          for (var i = 0; i < loader.loadCount; i++) {
            loader.class_sound_gain.push(loader.onload(loader.context, loader.bufferList, i));
            loader.class_sound_gain[i].gain.value = 0;
          }
          loader.class_sound_gain[0].gain.value = 0.4;
        }
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}
