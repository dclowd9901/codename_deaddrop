var http = require('http'),
	  mu = require('mustache'),
	 url = require('url'),
  router = require('./router').router;
	
// var router = require('./router').router;
// console.log( router );
var server = http.createServer( function( req, res ){	
	
	router.route( req, res );

});

server.listen(8080);