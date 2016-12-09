(function(){
  'use strict';

  var elements = {
  	zoom  : ch('#zoom-default')[0],
  	carousel : ch('.carousel')[0],
  	button : ch('.ch-btn')[0]
  }

	new ch.Zoom(elements.zoom).zoom.loadImage();
	new ch.Carousel(elements.carousel, { 
		 limitPerPage: 3,
         pagination: false,
		 arrows: true
	});
	new ch.Layer(elements.button, {
		      content: '',
		      shownby: 'pointertap'
		    })

 

})();