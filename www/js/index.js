ons.ready(function () {
    console.log("Onsen UI is ready!");
  });
  document.addEventListener('prechange', function(event) {
    document.querySelector('ons-toolbar .center')
      .innerHTML = event.tabItem.getAttribute('label');
  });
  if (ons.platform.isIPhoneX()) {
    document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
    document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
  }
  function gallery(){
    navigator.camera.getPicture(successCallbackG,FailCallback,{
      quality:50,destinationType:Camera.DestinationType.FILE_URI,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY
    });
  }
  function galleryV(){
    
    navigator.camera.getPicture(captureSuccessV,FailCallback,{
      quality:50,destinationType:Camera.DestinationType.FILE_URI,
      sourceType:Camera.PictureSourceType.PHOTOLIBRARY,
      mediaType:Camera.MediaType.VIDEO
    });
  }
  function captureSuccessV(mediaFiles) {
    console.log('video',mediaFiles)
      var i, path, len;
        path = mediaFiles;
        // do something interesting with the file
        document.getElementById("VIDEO").remove();
        var x = document.createElement("VIDEO");

        if (x.canPlayType("video/mp4")) {
          x.setAttribute("src", path);
        } else {
          x.setAttribute("src", "https://video.twimg.com/ext_tw_video/1244003140183060485/pu/vid/1280x720/nyR7xJnXM6sBC_6L.mp4");
        }

        x.setAttribute("width", "280");
        x.setAttribute("height", "180");
        x.setAttribute("controls", "controls");
        x.setAttribute("autoplay","autoplay");
        x.setAttribute("id","VIDEO");
        document.getElementById('wea').appendChild(x);

    };
  function captureSuccess(mediaFiles) {
      var i, path, len;
      for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        // do something interesting with the file
        document.getElementById("VIDEO").remove();
        var x = document.createElement("VIDEO");

        if (x.canPlayType("video/mp4")) {
          x.setAttribute("src", path);
        } else {
          x.setAttribute("src", "https://video.twimg.com/ext_tw_video/1244003140183060485/pu/vid/1280x720/nyR7xJnXM6sBC_6L.mp4");
        }

        x.setAttribute("width", "280");
        x.setAttribute("height", "180");
        x.setAttribute("controls", "controls");
        x.setAttribute("autoplay","autoplay");
        x.setAttribute("id","VIDEO");
        document.getElementById('wea').appendChild(x);
      }
    };
  function takeVideo() {
    // capture error callback

    // start video capture
    navigator.device.capture.captureVideo(captureSuccess, FailCallback, { limit: 1 });

  }
  function snapPicture() {
    
    navigator.camera.getPicture(successCallback, FailCallback, { destinationType: Camera.DestinationType.DATA_URL });

  }
  //Success Callback
  function successCallback(imageData) {
    //Display image
      document.getElementById("img").remove();
      var x = document.createElement("img");
      x.setAttribute("width","150");
      x.setAttribute("height","150");
      x.setAttribute("id","img");
      x.setAttribute("src","data:image/jpeg;base64, " + imageData);
      document.getElementById('pic').appendChild(x);
      //var image = document.getElementById('img');
      //image.src = "data:image/jpeg;base64, " + imageData;
    }
  function successCallbackG(imageURI) {
    var imageData =  imageURI  
    //Display image
      document.getElementById("img").remove();
      var x = document.createElement("img");
      x.setAttribute("width","150");
      x.setAttribute("height","150");
      x.setAttribute("id","img");
      x.setAttribute("src",imageData);
      document.getElementById('pic').appendChild(x);
      //var image = document.getElementById('img');
      //image.src = "data:image/jpeg;base64, " + imageData;
    }
    //Error CallBack
    function FailCallback(message) {
      alert('Error!!!: ' + message);
    }