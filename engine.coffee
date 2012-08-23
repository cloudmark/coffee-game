class GameObject
	
	constructor: (@name, @x, @y) ->
	
	# Update some parameters.  
	tick: (time, state) => 
		#console.log("Updating #{time}")

	# This method will be used to draw something on screen
	draw: (context, state) => 
		#console.log("Drawing #{@name} [#{@x}, #{@y}]")
		
	click: (x, y, state) => 
		#console.log("Click #{@name} [#{@x}, #{@y}]")
		
class GameState 
	constructor: -> 
		@killed = 0
		@total = 0
		
class GameEngine 
	
	constructor: (@canvas) -> 
		@context = canvas.getContext("2d")
		@state = new GameState()
		@gameObjects =  []
		@time = 0
		@TICK = 150
		
		# Hook up the click events 
		@canvas.addEventListener("click", @canvasClick, false);
		
	canvasClick: (event) => 
		for obj in @gameObjects
			obj.click?(event.offsetX, event.offsetY, @state)
		
		
	addGameObject: (gameObject) => 
		@gameObjects.push(gameObject)
		
		# Create a method on the object so that the object can remove itself.  
		gameObject.removeGameObject = (=> @removeGameObject(gameObject); true)
		
	removeGameObject: (gameObject) => 
		@gameObjects.remove(gameObject)
		
	start: => 
		# Register a time event. 
		@timer = window.setInterval(@tick, @TICK)
		
	stop: => 
		window.clearInterval(@timer)
		
	tick: => 
		@context.fillStyle="white"
		@context.fillRect(0,0,640, 480)

		@time = @time + @TICK

		# Set the tick.  
		for obj in @gameObjects
			obj.tick(@time, @state)
			
		# Draw the stuff.  
		for obj in @gameObjects
			obj.draw(@context, @state)
		
		# Check the winning state
		if @state.killed == @state.total
			@stop()
			alert("You have won!")
		
