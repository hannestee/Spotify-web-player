var usedColor;
var songurl;
var currentUrl = "https://p.scdn.co/mp3-preview/7d96f9e8087aee5a9822af8be5a8539b9b7b186a?cid=f6c1ec9bcbf7426fa257999930ec8ee8";

function songChange() {
	var audio = document.getElementById("audio");
	//console.log(audio);
    audio.src = currentUrl;
    audio.load();
	audio.loop = true;
	audio.volume = 0.5;
    audio.play();
	
	min = Math.ceil(0);
	max = Math.floor(4);
	
	
	var colorChoice = Math.floor(Math.random() * (max - min)) + min;
	
	while (colorChoice == usedColor){
		colorChoice = Math.floor(Math.random() * (max - min)) + min;
	}
	//console.log("usedcolor",usedColor);
	//console.log("colorchoice",colorChoice);
	//console.log(context);
	
	if (context){
		context.close();
		context = null;
		//console.log("context closed");
		canvas = document.getElementsByTagName("canvas");
		//console.log(canvas);
		context = canvas[0].getContext("2d");
		context.clearRect(0,0, canvas.width, canvas.height);
	}
	
    var context = new AudioContext();
    var src = context.createMediaElementSource(audio);
    var analyser = context.createAnalyser();

    var canvas = document.getElementById("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    var ctx = canvas.getContext("2d");

    src.connect(analyser);
    analyser.connect(context.destination);

    analyser.fftSize = 256;

    var bufferLength = analyser.frequencyBinCount;
    //console.log(bufferLength);

    var dataArray = new Uint8Array(bufferLength);

    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;

    var barWidth = (WIDTH / bufferLength) * 2.5;
    var barHeight;
    var x = 0;

    function renderFrame() {
      requestAnimationFrame(renderFrame);

      x = 0;

      analyser.getByteFrequencyData(dataArray);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
		
      for (var i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
		
		if (colorChoice == 0) {
			var r = barHeight - (2 * (i/bufferLength)) - 100;
			var g = 50 * (i/bufferLength);
			var b = 225;
			usedColor = 0;
		} else if (colorChoice == 1) {
			var r = barHeight + (25 * (i/bufferLength));
			var g = 250 * (i/bufferLength);
			var b = 50;
			usedColor = 1;
		} else if (colorChoice == 2){
			var r = barHeight - (8 * (i/bufferLength)) - 25;
			var g = 55 * (i/bufferLength);
			var b = 155;
			usedColor = 2;
		} else if (colorChoice == 3) {
			var r = barHeight + (25 * (i/bufferLength));
			var g = 2 * (i/bufferLength);
			var b = 15;		
			usedColor = 3;
		}
        //var r = barHeight + (25 * (i/bufferLength));
		//var g = 250 * (i/bufferLength);
		//var b = 50;

        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }
    }

    audio.play();
    renderFrame();
	//console.log("context:", context);
};

console.log("bars.js ready");
