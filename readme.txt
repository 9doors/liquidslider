Comments
liquidslider is a jquery slider that allows both sliding and fading of images. This slider also allows you to track clicks of the navigation as in-page-events by Google Analytics (SEO enhancement). This slider has a 'thumbnail' mode (thumbnails are the linked to the slide) or and overlay (small button links that 'overlay' the slider image). Additionally there is a consoleDebug function that I use to output values to the chrome or firefox debug console. This slider is not intended for novice developers. 

I have also include my css, and wordpress plugin code, a sample html page, and sample graphic files.

Values that are passed to the slider. initialized Object Labels
	init.panelImg , init.panel, init.panelImgFirst, init.slides,init.slide, init.slideNav, init.slideNavLink, init.navStyle, init.moveSlideSpeed, init.nextSlideTime, init.fadeInSpeed, init.fadePanels, init.inPageEventTrack, init.inPageEventLabel, init.autoPlay, init.consoleDebug;

var config = [ '.panel img','#panels .panel','.panel:first img:first','#slides',
	 '#slides .slide', '.slide_nav', '.slide_nav_item',959,'thumbnail',  1000, 3000,1500, true, false,'HomeSlides',false, false ];	
var $jq = jQuery.noConflict(); 
	$jq(document).ready(function(){ 
	liquidslider(config);
	});