// @author: Andre Venancio (noreply@andrevenancio.com)
// @date: 30 June 2016
var Webcam = Webcam || function(width, height) {
    this.width = width || 320;
    this.height = height || 240;

    this.stream = false;

    this.domElement = document.createElement('video');
    this.domElement.width = this.width;
    this.domElement.height = this.height;

    // polyfill for Stream API
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || navigator.oGetUserMedia;
}

Webcam.prototype = {

    constructor: Webcam.prototype,

    start: function(success, error) {
        this.success = success || function() {};
        this.error  = error || function() {};
        navigator.getUserMedia({
            video: true
        }, this.onSuccess.bind(this), this.onError.bind(this));
    },

    stop: function() {
        if (this.stream) {
            var track = this.stream.getTracks()[0];
            track.stop();
            this.domElement.src = '';
        }
    },

    onSuccess: function(stream) {
        this.stream = stream;
        if (navigator.mozGetUserMedia) {
            this.domElement.mozSrcObject = this.stream;
        } else {
            var vendorURL = window.URL || window.webkitURL;
            this.domElement.src = vendorURL.createObjectURL(this.stream);
        }
        this.domElement.play();
        this.success();
    },

    onError: function(e) {
        this.error(e);
    }
};
