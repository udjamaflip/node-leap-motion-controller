
var Leap = require("leapjs");

var controller = new Leap.Controller({enableGestures: true}),
	printTimeout = false;

controller.on("frame", function(frame) {
	//console.log("Frame: " + frame.id + " @ " + frame.timestamp);
});

var swiper = controller.gesture('swipe');
var x = 2, y = 2;
var activeSwipe = false;
swiper.update(function(g) {

	if (activeSwipe) {

		if (g.translation()[0] > activeSwipe.translation()[0]) {
			console.log(g.translation()[0]);
			activeSwipe = g;
		}

		activeSwipe = g;
	} else {

		activeSwipe = g;
		setTimeout(function() { activeSwipe = false; }, 5000);
	}


	/*
		var xDir = Math.abs(g.translation()[0]) > tolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
		var yDir = Math.abs(g.translation()[1]) > tolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
		x += xDir;
		x = (x + 5) % 5;
		y += yDir;
		y = (y + 5) % 5;
		console.log("x:"+x);
		console.log("y:"+y);
		console.log('.grid #d'+x+"_"+y);*/

});


controller.on("hand", function(hand) {
	if (!printTimeout) {
		//console.log("Hand: " + hand.id + ' Roll: ' + hand.roll() + ' Pitch: ' + hand.pitch() + ' Yaw: ' + hand.yaw());
		printTimeout = setTimeout(function() { printTimeout = false; }, 500);
	}
});

controller.on('ready', function() {
	console.log("ready");
});
controller.on('connect', function() {
	console.log("connect");
});
controller.on('disconnect', function() {
	console.log("disconnect");
});
controller.on('focus', function() {
	console.log("focus");
});
controller.on('blur', function() {
	console.log("blur");
});
controller.on('deviceConnected', function() {
	console.log("deviceConnected");
});
controller.on('deviceDisconnected', function() {
	console.log("deviceDisconnected");
});

controller.connect();
console.log("\nWaiting for device to connect...");