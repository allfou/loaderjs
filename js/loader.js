/**
 * Widget: Displays loading progress, uses a timer.
 *
 * Parameters:
 * 	- id 		(mandatory) : binds an instance of the widget to an element
 * 	- color 	(optional)	: white, grey, blue, green, yellow, red, black, orange, etc.
 *	- theme 	(optional)	: shadow, fancy
 *	- dimension	(optional)	: small, medium, large
 *	- speed		(optional)	: in millisecondes (e.g. 1000)
 *  - interval	(optional)	: number of keyframes
 *  
 * Author: Fouad Allaoui
 * Date: 02/22/2013
 * Version: 2.0
 * Browser compatibility: IE9+, FF, Safari, Chrome
 */


/**
 * Timer Object: Simple counter which counts from 0 to n
 * can specify a speed in milliseconds
 */
function Timer(speed, interval) {
	this.speed = speed;
	this.interval = interval;
}

Timer.prototype.count = function(startTime) {	
	var self = this; // pass current context to setTimeout()

	setTimeout(function() {
		self.render(startTime);
		startTime++;
		if (startTime < self.interval) {
			self.count(startTime);
		}
	}, self.speed);
}

Timer.prototype.render = function() {}

/**
 *  Loader Object: extends Timer object
 *  Represents a Widget with an id, a type (circle, bar, etc) and a theme.
 */
function Loader(options) {
	Timer.call(this, options.speed, options.interval);
	this.id = options.id;
	this.color = options.color;
	this.theme = options.theme;
	this.dimension = options.dimension;
	
	this.startAngle = 4.71238898038469; // top middle of the circle
	
	this.init(this.id);
	this.count(0);
}

// Extends Timer object
Loader.prototype = Object.create(Timer.prototype);

Loader.prototype.init = function() {
	this.container = document.getElementById(this.id);
	this.container.innerHTML = drawCircle(this.id);
	this.screen = document.getElementById(this.id + '_screen');
	this.canvas = document.getElementById(this.id + '_keyframes');
	this.ctx = this.canvas.getContext("2d");
	
	// configure widget
	this.config(this.theme, this.dimension, this.color, this.speed);
}

// Overrides Timer.render()
Loader.prototype.render = function(i) {
	// Update percentage value
	this.screen.innerHTML = '<h3>'+ round5((100/this.interval) * (i+1))  + '%</h3>';

	// Update loading progress
	this.ctx.beginPath();
	this.ctx.moveTo(this.canvas.width / 2, this.canvas.height / 2);	
	this.ctx.arc(this.canvas.width / 2, // x
				this.canvas.height / 2, // y
				this.canvas.height / 2, // radius
				this.startAngle, // start angle
				(this.startAngle + 0.01) + (Math.PI * 2 * ((360 / this.interval) / 360)), // end angle (adding 0.01 makes it pixel perfect!)
				false // clockwise
				);
	//this.ctx.lineTo(this.canvas.width / 2, this.canvas.height / 2);
	this.ctx.fill();
	this.startAngle += Math.PI * 2 * ((360 / this.interval) / 360);	
}

// Applies configuration to Loader
Loader.prototype.config = function(theme, dimension, color, speed) {		
	var size = 0;
	
	switch(dimension) {
	case "small":
		size = 100; break;
	case "medium":
		size = 150; break;
	case "large":
		size = 200; break;
	default:
		// Prevent problems if dimension is not specified or incorrect => default to small
		size = 100;
		dimension = "small";
	}
		
	this.canvas.width = size;
	this.canvas.height = size;
	this.container.className += "loader " + theme + " " + dimension;
	this.screen.className += "screen " + theme + " " + dimension + "_screen";
	
	// Prevent error if color is not specified or incorrect => devaults to black
	if (color == null)
		this.ctx.fillStyle = "black";
	else
		this.ctx.fillStyle = color;
	
	// Prevent error if speed is not specified or incorrect => defaults to 1s (1000ms)
	if (isNaN(speed))
		this.speed = 1000;
}

/** Helper methods **/

// In case Object.create does not exist
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        var F = function() {};
        F.prototype = o;
        return new F();
    };
}

// Draws circle widget
function drawCircle(id) {
	return '<div id=\"' + id + '_screen\"><h3>0%</h3></div>' + '<canvas id=\"' + id + '_keyframes\"/>';
}

// Rounds a number nearest 5
function round5(x) {
    return (x % 5) >= 2.5 ? parseInt(x / 5) * 5 + 5 : parseInt(x / 5) * 5;
}