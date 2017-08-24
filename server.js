var http = require('http');
var express = require('express');

var app = express();
var server = new http.Server(app);

app.use((req, res, next) => {
	console.log('In middleware 1');
	next();
	console.log('out of middleware 1');
});


app.use((req, res, next) => {
	console.log('---In middleware 2');
	next();
	console.log('---out of middleware 2');
});

app.get('/', (request, response) => {
	console.log('in handler')
	response.end('hello world!');
});


var port = 3000;
server.listen(port, () => {
	console.log(`server listening on port ${port}`)
}) 