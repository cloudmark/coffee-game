`Array.prototype.remove = function(v) { this.splice(this.indexOf(v) == -1 ? this.length : this.indexOf(v), 1); }`

class ColourUtils 
	
	constructor: -> 
		
	getRandomColour: -> 
		Math.round(0xffffff * Math.random()).toString(16)