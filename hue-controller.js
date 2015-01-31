
var hueController = function() {
	'use strict';

	//get config from config.json
	var fs = require('fs');
	var configJson = JSON.parse(fs.readFileSync('./config.json', 'UTF-8'));
	//create API base url from config
	this.hueBaseUrl = 'http://' + configJson.ip + '/api/' + configJson.username + '/';

	//get request handler
	this.request = require('request');

};

hueController.prototype = {

	getLights: function(callback) {
		'use strict';
		//list lights request url
		var params = {
			'url': this.hueBaseUrl + 'lights',
			'json': true
		};

		this.request(params, function(error, response, body) {
			if (!error && response.statusCode === 200) {
				callback(body);
			} else {
				callback({'error':error, 'code': response.statusCode});
			}
		});

	},

	turnLightOn: function(lightId) {
		'use strict';

		//turn on light params
		var params = {
			'url': this.hueBaseUrl + 'lights/' + lightId + '/state',
			'json': {"on":true},
			'method': 'PUT'
		};

		this.request(params, function(error, response, body) {
			if (error || response.statusCode !== 200) {
				console.log('ERROR TURNING ON LIGHT [' + lightId + ']');
				console.log('HTTP STATUS CODE :: ' + response.statusCode);
				console.log(error);
			} else {
				console.log('Light ' + lightId + ' turned on');
			}
		});

	},

	turnLightOff: function(lightId) {
		'use strict';

		//turn on light params
		var params = {
			'url': this.hueBaseUrl + 'lights/' + lightId + '/state',
			'json': {"on":false},
			'method': 'PUT'
		};

		this.request(params, function(error, response, body) {
			if (error || response.statusCode !== 200) {
				console.log('ERROR TURNING OFF LIGHT [' + lightId + ']');
				console.log('HTTP STATUS CODE :: ' + response.statusCode);
				console.log(error);
			} else {
				console.log('Light ' + lightId + ' turned off');
			}
		});
	},

	turnAllOn: function() {
		'use strict';
		var self = this;
		this.getLights(function(lights) {
			if (!lights.error) {
				for (var lightId in lights) {
					if (parseInt(lightId)) {
						self.turnLightOn(lightId);
					}
				}
			}
		});
	},

	turnAllOff: function() {
		'use strict';
		var self = this;
		this.getLights(function(lights) {
			if (!lights.error) {
				for (var lightId in lights) {
					if (parseInt(lightId)) {
						self.turnLightOff(lightId);
					}
				}
			}
		});
	}

};


module.exports = new hueController();