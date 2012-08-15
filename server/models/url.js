var _ = require('underscore');

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
			this.isUrl = true;
		}
	}
	
	function validate(){
		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp( expression );
				
		return ( params.oUrl.match( regex ) ) ? true : false;
	}
	
	init();
}