#=include <http://code.jquery.com/jquery-1.7.1.min.js>
#=include <utils.coffee>
#=include <engine.coffee>


class StatusBar extends GameObject
	constructor: ->
		super("Top Bar", 5, 15)
		
	tick: (@time) => 
		
	draw: (context, state) => 
		super(context)		
		context.fillStyle = "black"
		context.font = "12pt Arial"
		str_time=(@time/1000).toFixed(2)
		str_percentage=((state.killed/state.total) * 100).toFixed(2)
		message = "Time: #{str_time} Kill: #{state.killed} Total: #{state.total}"
		context.fillText(message, @x, @y)
		
		
class RectangleObject extends GameObject
	constructor: (@color, x=0, y=0) -> 
		super("Rectangle Object", x, y)
		@reverseX = 1
		@reverseY = 1
		@previousX=@y
		@previousY=@x

	tick: (time) => 
		super(time)
		
		@previousX = @x
		@previousY = @y
		
		if (@x <= 0 or (@x >= (640 - 10)))
			@reverseX *= -1
			if @x < 10 then @x = 10
			if @x > 640 - 10 then @x = 640 -10
			
		if (@y <= 0 or (@y >= (480 - 10)))
			@reverseY *= -1
			if @y < 10 then @y = 10
			if @y > 480 - 10 then @y = 480 -10
		
		
		@x = @x + (@reverseX * (10))  
		@y = @y + (@reverseY * (10)) 

		
		
	
	drawItem: (context, x, y) => 
		context.beginPath()
		context.rect(@x,@y,10,10)
		context.fillStyle=@color
		context.fill()
		context.lineWidth = 2
		context.strokeStyle = "black"
		context.stroke()
		
	draw: (context, state) => 
		super(context)	
		context.globalAlpha = 0.5;
		@drawItem(context, @x, @y)
		
	click: (x, y, state) => 
		super(x, y, state)
		if (x >= @x - 10) and (x <= @x+20) and (y >= @y - 10) and (y <= @y + 20)
			state.killed += 1
			@removeGameObject()

# The Document Has Loaded.    
$(document).ready((=>
	canvas = document.getElementById('canvas')
	console.log(canvas)
	
	
	engine = new GameEngine(canvas);
	colourUtils = new ColourUtils(); 
	# Add a rectangle
	
	statusBar = new StatusBar()

	# Add the Top Bar
	engine.addGameObject(statusBar)
	
	# Create a rectangle 
	for x in [0..640] by 200
		for y in [0..480] by 200
			engine.state.total += 1
			
			rectangle = new RectangleObject(colourUtils.getRandomColour(), x, y)
			engine.addGameObject(rectangle)

	engine.start() 

))
