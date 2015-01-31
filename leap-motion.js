

var Leap = require("leapjs");
var controller = new Leap.Controller({enableGestures: true});

var swipeListener = controller.gesture('swipe');

var hueController = require('./hue-controller');

var activeSwipe = false;
swipeListener.update(function(gestureEvent) {

	gestureEvent.gestures.forEach(function(gesture) {

		//timeout to let swipe finish
		if (activeSwipe) { clearTimeout(activeSwipe); }
		activeSwipe = setTimeout(function() {

			var direction = gesture.direction;
			if (direction[0] < direction[2]) {
				hueController.turnAllOn();
			} else {
				hueController.turnAllOff();
			}

		}, 200);

	});

});



controller.connect();