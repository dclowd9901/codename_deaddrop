var mu = require('mu2');
var util = require('util');

mu.root = __dirname + '/server/views';

exports.router = {
	routes : {
		"/new" : "newLink"
	},
	req : null,
	res : null,
	route : function( req, res ){
		this.req = req;
		this.res = res;
		
		this.handle( req.url );
	},
	handle : function( path ){
		var method = this.routes[path];
		
		if( !this[method] ){
			this.error();
		} else {
			this[method]();
		}
	},
	newLink : function(){
		var stream = mu.compileAndRender('index.js', {
			name : "David",
			root : __dirname
		});
		util.pump( stream, this.res );
	},
	error : function(){
		var stream = mu.compileAndRender( '404.js' );
		util.pump( stream, this.res );
	}
};