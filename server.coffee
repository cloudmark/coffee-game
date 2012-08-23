http = require("http") 
url = require("url")
path = require("path") 
file = require("fs")

http.createServer((request, response) -> 
	object = url.parse(request.url, true)	
	uri = object.pathname
	
	console.log("Request: #{uri}") 
	filename = path.join(process.cwd(), uri)
	path.exists(filename, ((exists) -> 
		if (not exists)
			console.log "\t 400 File Not Found"
			response.writeHead 404, { "Content-Type": "text/plain"}
			response.end("Cannot find your file"); 
		else
			file.readFile filename, 'binary', (err, file) -> 
				if err
					console.log "\t 500 Could Not Open File"
					console.log "An error has occurred #{err}"
					response.writeHead 500, { "Content-Type": "text/plain"}	
					response.end(err)
				else
					console.log "\t 200 File Served"
					response.writeHead 200
					response.write(file, 'binary')
					response.end()
		# New lines are cute.  
		console.log "" 
	)); 


).listen(8888); 

console.log("Started Server on Port 8888");

# Open Standard Listener


 
