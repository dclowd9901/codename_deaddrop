var _ = require('underscore');
var mongo = require('mongodb');

var Db = mongo.Db,
	ObjectID = mongo.BSONPure.BSON.ObjectID,
	Server = mongo.Server;

exports.UrlModel = function( url ){
	var params = {};
	
	_.extend( params, {
		oUrl : url,
		isUrl : false
	});
	
	function init(){
		if( !validate() ){
			return false;
		} else {
			params.isUrl = true;
		}
	}
	
	function validate(){
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp( expression );
				
		return ( params.oUrl.match( regex ) ) ? true : false;
	}
	
	var UrlDb = function( host, port ){
		this.db = new Db( 'Easify', new Server( host, port, { auto_reconnect : true }, {}));
		this.db.open( function(){} );
	};
	
	var genUri = function( callback ){
		console.log('here');
		this.db.collection( 'EasifiedUrls', function( error, gen_uri_events_collection ){
			if( error ) callback(error);
			else callback( null, gen_uri_events_collection );
		});
	};
	
	init();
	
	return {
		params : params,
		urlDb : UrlDb,
		genUri : genUri
	}
}