var express = require('express');
var app = express();
var mu = require('mu2');
var util = require('util');
var path = require('path');
var mongo = require('mongodb');
var EventEmitter = require('events').EventEmitter;

eventsBus = new EventEmitter();
mu.root = path.join(__dirname, 'server/views');

var Db = mongo.Db,
	ObjectID = mongo.BSONPure.BSON.ObjectID,
	Server = mongo.Server;

var db = new Db('node-mongo-examples', new Server( 'localhost', 27017, {}), {
	native_parser: false
});

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
	
	console.log( url );
	
	if ( url.params.isUrl ) {
		url.urlDb( 'localhost', 27017 );
		return url.genUri( function(a,b){
			console.log(a);
			console.log(b); 
			console.log('called back') 
		});
	} else {
		console.log( 'not url' );
	}
});
	
app.listen(8080);
console.log( 'Listening on port 8080' );