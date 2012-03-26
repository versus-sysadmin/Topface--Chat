/*
	General class for Topface: Chat interface
	Author Alexander Bezrukov aka versus <god@goan.ru>
*/

var topface = function(){
	var STD_CORNER = '4px';
	var BIG_CORNER = '8px';
	
	return {
		siteInit: function() {
			/* Chat */
			chat.init();
			
			/* Corners */
			jQuery('.corners').corner(STD_CORNER);
			jQuery('.corners-big').corner(BIG_CORNER);
		}
	};
}();