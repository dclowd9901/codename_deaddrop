var express = require('express');
var app = express();
var mu = require('mu2');
var util = require('util');
var path = require('path');
var urlGen = require('server/tools/urlgen');
var EventEmitter = require('events').EventEmitter;

eventsBus = new EventEmitter();
mu.root = path.join(__dirname, 'server/views');

app.configure( function(){
	app.use( express.static( 'public' ) );
});

app.get('/', function( req, res ){
	
	var stream = mu.compileAndRender('home.mu', {
		title : 'Easify',
		css : [ 
			{ filename : 'flourish' }, 
			{ filename : 'bootstrap' } 
		],
		dataMain : '/js/new'
	});
	
	util.pump( stream, res );	
})

app.get('/new/:url', function( req, res ){
	console.log( __dirname );
	var UrlModel = require(__dirname + '/server/models/url.js').UrlModel;
	
	var url = new UrlModel( req.params.url );
	
	return ( url.isUrl ) {
		return true;
	} else {
		return false;
});
	
app.listen(8080);
console.log( 'Listening on port 8080' );