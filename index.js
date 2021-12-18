// navbar 
// ---------Responsive-navbar-active-animation-----------
function test(){
	var tabsNewAnim = $('#navbarSupportedContent');
	// var selectorNewAnim = $('#navbarSupportedContent').find('li').length;
	var activeItemNewAnim = tabsNewAnim.find('.active');
	var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
	var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
	var itemPosNewAnimTop = activeItemNewAnim.position();
	var itemPosNewAnimLeft = activeItemNewAnim.position();
	$(".hori-selector").css({
		"top":itemPosNewAnimTop.top + "px", 
		"left":itemPosNewAnimLeft.left + "px",
		"height": activeWidthNewAnimHeight + "px",
		"width": activeWidthNewAnimWidth + "px"
	});
	$("#navbarSupportedContent").on("click","li",function(e){
		$('#navbarSupportedContent ul li').removeClass("active");
		$(this).addClass('active');
		var activeWidthNewAnimHeight = $(this).innerHeight();
		var activeWidthNewAnimWidth = $(this).innerWidth();
		var itemPosNewAnimTop = $(this).position();
		var itemPosNewAnimLeft = $(this).position();
		$(".hori-selector").css({
			"top":itemPosNewAnimTop.top + "px", 
			"left":itemPosNewAnimLeft.left + "px",
			"height": activeWidthNewAnimHeight + "px",
			"width": activeWidthNewAnimWidth + "px"
		});
	});
}
$(document).ready(function(){
	setTimeout(function(){ test(); });
});
$(window).on('resize', function(){
	setTimeout(function(){ test(); }, 500);
});
$(".navbar-toggler").click(function(){
	$(".navbar-collapse").slideToggle(300);
	setTimeout(function(){ test(); });
});



// --------------add active class-on another-page move----------
jQuery(document).ready(function($){
	// Get current path and find target link
	var path = window.location.pathname.split("/").pop();

	// Account for home page with empty path
	if ( path == '' ) {
		path = 'index.html';
	}

	var target = $('#navbarSupportedContent ul li a[href="'+path+'"]');
	// Add active class to target link
	target.parent().addClass('active');
});

// var emoji = ['🐣', '🎡', '🏝', '💛', '👸🏽', '🤣', '🦑'];
var emoji = ['💓','💕','💖','👛','🎀','🌺','🌸'];
var totalEmojiCount = 200;


var continueDraw = false;
var context;
var canvasWidth;
var canvasHeight;
var emojies = [];

var button = document.getElementById('button');
button.disabled = true;

function initializeCanvas() {
  var canvas = document.getElementById('canvas');
  context = canvas.getContext( '2d' );
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.scale(2, 2);
  
  generateCanvasSize(canvas);
  generateEmojis();
}

function generateCanvasSize(canvas) {
  var coord = canvas.getBoundingClientRect();
  canvasWidth = coord.width;
  canvasHeight = coord.height;
}

function generateEmojis() {
  if (continueDraw === true) return;
  emojies = [];
  button.disabled = true;
  
  for (var iterate = 0; iterate < totalEmojiCount; iterate++) {
    var x = Math.floor(Math.random() * canvasWidth);
    var offsetY = Math.abs(Math.floor(Math.random() * 300));
    var fontSize = Math.floor(Math.random() * 10) + 20;

    emojies.push({
      emoji: emoji[Math.floor(Math.random() * emoji.length)],
      x,
      y: canvasHeight + offsetY,
      count: Math.floor(Math.random() * 3) + 4,
      fontSize,
    });

    if (iterate === (totalEmojiCount - 1)) {
      continueDraw = true;
      drawConfetti();
      endDraw();
    }
  }
}

function drawConfetti() {
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  emojies.forEach((emoji) => {
    drawEmoji(emoji);
    emoji.y = emoji.y - emoji.count;
  });

  if (this.continueDraw) {
    requestAnimationFrame(this.drawConfetti.bind(this));
  }
}

function drawEmoji(emoji) {
  context.beginPath();
  context.font = emoji.fontSize + 'px serif';
  context.fillText(emoji.emoji, emoji.x, emoji.y);
}

function endDraw() {
  setTimeout(() => {
    continueDraw = false;
    button.disabled = false;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
  }, 5000);
}

initializeCanvas();


var mainFunction = 
{
	elements: {
		container 			: ".container",
		containerInner		: ".container-inner",
		videoPlayerContainer: ".video-player-container",
		videoContainer 		: ".video-container",
		playerContainer		: ".player-container",
		mediaVideo 			: "#media-video",
		playControl 		: ".play-control",
		playButton 			: ".play-button",
		pauseButton 		: ".pause-button",
		volumeControl 		: ".volume-control",
		volumeButton 		: ".volume-button",
		volumeButtonMute 	: ".volume-button-mute",
		progress 			: ".progress",
		progressOver 		: ".progress-over",
		progressHidden 		: ".progress-hidden",
		progressBackground 	: ".progress-background",
		indicator 			: ".indicator",
		fullScreenButton	: ".fullscreen-button"
	},

	isPlay 		: true,
	isVolume 	: true,
	isEnd		: false,
	progressBarHeight : 100,

	init: function(){
		mainFunction.defaultSettings();
		mainFunction.clickSettings();
		mainFunction.playControlVideo();
		mainFunction.volumeControlVideo();
		mainFunction.progressControlVideo();
		mainFunction.mouseHideControl();
	},

	defaultSettings: function(){

		$(mainFunction.elements.mediaVideo)[0].controls = false;

		$(window).on("resize", onResize);

		function onResize(){
			$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
			$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
			$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
			mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
			$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		}

		onResize();

	},

	clickSettings: function(){
		$(mainFunction.elements.playControl).on("click", mainFunction.playControlVideo);
		$(mainFunction.elements.volumeControl).on("click", mainFunction.volumeControlVideo);
		$(mainFunction.elements.mediaVideo).on("click", mainFunction.playControlVideo);
		$(mainFunction.elements.fullScreenButton).on("click", mainFunction.fullScreenControl);
		$("body").on("keyup", function(e){ if(e.which == 27) { mainFunction.exitFullScreen(); } });
	},

	fullScreenControl:function(){
		
		if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
		{
			if (document.documentElement.requestFullscreen)
			{
				document.documentElement.requestFullscreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.msRequestFullscreen)
			{
				document.documentElement.msRequestFullscreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.mozRequestFullScreen)
			{
				document.documentElement.mozRequestFullScreen();
				mainFunction.onFullScreen();
			}
			else if (document.documentElement.webkitRequestFullscreen)
			{
				document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
				mainFunction.onFullScreen();
			}
		}
		else
		{
			if (document.exitFullscreen)
			{
				document.exitFullscreen();
				mainFunction.exitFullScreen();
			}
			else if(document.msExitFullscreen)
			{
				document.msExitFullscreen();
				mainFunction.exitFullScreen();
			}
			else if (document.mozCancelFullScreen)
			{
				document.mozCancelFullScreen();
				mainFunction.exitFullScreen();
			}
			else if (document.webkitExitFullscreen)
			{
				document.webkitExitFullscreen();
				mainFunction.exitFullScreen();
			}
		}
	},

	onFullScreen: function(){

		$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		$(mainFunction.elements.container).css("display", "block");
		$(mainFunction.elements.videoPlayerContainer).width("100%");
		$(mainFunction.elements.videoPlayerContainer).height("100%");
		$(mainFunction.elements.videoContainer).height("calc(100% - 40px)");
		$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
		$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
		$(".container-inner").css("display", "none");

	},

	exitFullScreen: function(){
		
		$(mainFunction.elements.container).css("display", "-webkit-box");
		$(mainFunction.elements.container).css("display", "-moz-box");
		$(mainFunction.elements.container).css("display", "-ms-flexbox");
		$(mainFunction.elements.container).css("display", "-webkit-flex");
		$(mainFunction.elements.container).css("display", "flex");
		$(mainFunction.elements.videoPlayerContainer).width("648");
		$(mainFunction.elements.videoPlayerContainer).height("350");
		$(mainFunction.elements.videoContainer).height("310");
		$(mainFunction.elements.progress).width( $(mainFunction.elements.playerContainer).width() - 223 );
		$(mainFunction.elements.progressBackground).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		$(mainFunction.elements.progressHidden).width( $(mainFunction.elements.playerContainer).width() - 223 - 40 );		
		mainFunction.progressBarHeight = $(mainFunction.elements.playerContainer).width() - 223 - 40;
		$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / $(mainFunction.elements.mediaVideo)[0].duration) * $(mainFunction.elements.mediaVideo)[0].currentTime ));
		$(".container-inner").css("display", "inherit");

	},

	mouseHideControl: function(){

		var mouseHide = setTimeout(onMouseHide, 3000);

		$(mainFunction.elements.containerInner).on("mousemove", function(){

			clearTimeout( mouseHide );

			onMouseShow();

		});

		$(mainFunction.elements.containerInner).on("mousemoveend", function(){

			clearTimeout( mouseHide );

			mouseHide = setTimeout(onMouseHide, 3000);

		});

		function onMouseHide(){ $("body").css("cursor", "none"); }

		function onMouseShow(){ $("body").css("cursor", "inherit"); }

	},

	playControlVideo: function(){
		if(mainFunction.isPlay) { $(mainFunction.elements.mediaVideo)[0].play(); } else { $(mainFunction.elements.mediaVideo)[0].pause(); }
		$(mainFunction.elements.playButton).css("display", ( (mainFunction.isPlay) ? "none" : "table-cell" ) );
		$(mainFunction.elements.pauseButton).css("display", ( (!mainFunction.isPlay) ? "none" : "table-cell" ) );
		mainFunction.isPlay = !mainFunction.isPlay;
		mainFunction.isEnd = false;
	},

	volumeControlVideo: function(){
		$(mainFunction.elements.mediaVideo)[0].muted = !mainFunction.isVolume;
		$(mainFunction.elements.volumeButtonMute).css("display", ( (mainFunction.isVolume) ? "none" : "table-cell" ) );
		$(mainFunction.elements.volumeButton).css("display", ( (!mainFunction.isVolume) ? "none" : "table-cell" ) );
		mainFunction.isVolume = !mainFunction.isVolume;
	},

	progressControlVideo: function(){

		var mouseX 			= 0;
		var isDown 			= false;
		var currentMinute 	= 0;
		var currentSecond 	= 0;
		var mediaPlayer 	= $(mainFunction.elements.mediaVideo)[0];

		mediaPlayer.addEventListener("timeupdate", onProgressVideo, false);

		function onProgressVideo(){
			$(mainFunction.elements.progressOver).css("width", String( (mainFunction.progressBarHeight / mediaPlayer.duration) * mediaPlayer.currentTime ));
			videoEndControl();
			setIndicator(mediaPlayer.currentTime, mediaPlayer.duration);
		}

		function videoEndControl(){
			if(mediaPlayer.currentTime >= mediaPlayer.duration)
			{
				mainFunction.isPlay = false;
				mainFunction.playControlVideo();
				mainFunction.isEnd = true;
			}
		}

		function setIndicator(current, duration){
			var durationMinute 		= Math.floor(duration / 60);
			var durationSecond 		= Math.floor(duration - durationMinute * 60);
			var durationLabel 		= durationMinute + ":" + durationSecond;
			currentSecond 			= Math.floor(current);
			currentMinute 			= Math.floor(currentSecond / 60);
			currentSecond 			= currentSecond - ( currentMinute * 60 );
			currentSecond 			= ( String(currentSecond).length > 1 ) ? currentSecond : ( String("0") + currentSecond );
			var currentLabel 		= currentMinute + ":" + currentSecond;
			var indicatorLabel 		= currentLabel + " / " + durationLabel;
			$(mainFunction.elements.indicator).text( indicatorLabel );
		}

		$(mainFunction.elements.progressHidden).on("mousemove", onProgressHiddenMouseMove);

		function onProgressHiddenMouseMove(e){
			var parentOffset 	= $(this).parent().offset(); 
			mouseX 				= Math.floor( e.pageX - parentOffset.left - 20 );
			if(isDown) { mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX; }
		}

		$(mainFunction.elements.progressHidden).on("click", function(){ if(!isDown) { mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX; } });

		$(mainFunction.elements.progressHidden).on("mousedown", onProgressHiddenMouseDown);

		function onProgressHiddenMouseDown(){

			isDown = true;

			mediaPlayer.currentTime = (mediaPlayer.duration / mainFunction.progressBarHeight) * mouseX;

			$(mainFunction.elements.mediaVideo)[0].pause();
		}

		$(mainFunction.elements.progressHidden).on("mouseup", function(){ isDown = false; if(!mainFunction.isEnd) {  mainFunction.isPlay = true; mainFunction.playControlVideo(); } });

		$(mainFunction.elements.progressHidden).on("mouseout", function(){ isDown = false; if(!mainFunction.isEnd) {  mainFunction.isPlay = true; mainFunction.playControlVideo(); } });

	}
};

$(document).on("ready", mainFunction.init);

(function ($) {
    var timeout;
    $(document).on('mousemove', function (event) {
        if (timeout !== undefined) {
            window.clearTimeout(timeout);
        }
        timeout = window.setTimeout(function () {
            $(event.target).trigger('mousemoveend');
        }, 100);
    });
}(jQuery));

