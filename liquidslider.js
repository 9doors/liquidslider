/* Written by Felipe Lujan-Bear
// jQuery Based carousel
// This slider also uses jquery.imgpreload see EOF

Licensed under the MIT license
http://en.wikipedia.org/wiki/MIT_License

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

*/
/* if you change init.fadePanels = true, carousel changes from fading between slides to sliding */

var $liquid = jQuery.noConflict();
$liquid(document).ready(function(){
	/* slides*/
	
	/*setup navigation*/
	liquidslider  = Liquidslider = function(config) {
	
	var init = new Object();
	
	if(config.length>0){ 
		init.panelImg = config[0];	
		init.panel = config[1];	
		init.panelImgFirst = config[2];	
		init.slides = config[3];	
		init.slide = config[4];	
		init.slideNav = config[5];	
		init.slideNavLink = config[6];	
		init.slideWidth = config[7];
		init.navStyle = config[8];
		init.moveSlideSpeed = config[9];	
		init.nextSlideTime = config[10];	
		init.fadeInSpeed = config[11];	
		init.fadePanels = config[12];	
		init.inPageEventTrack = config[13];	
		init.inPageEventLabel = config[14];
		init.autoPlay = config[15];
		init.consoleDebug = config[16];	
		} else {
		init.panelImg = '.panel img';	
		init.panel = '#panels .panel';	
		init.panelImgFirst = '.panel:first img:first';	
		init.slides = '#slides';	
		init.slide = '#slides .slide';	
		init.slideNav = '.slide_nav';	
		init.slideNavLink = '.slide_nav_item';	
		init.slideWidth = 959;
		init.navStyle = 'overlay';
		init.moveSlideSpeed = 1000;	
		init.nextSlideTime = 2000;	
		init.fadeInSpeed = 1500;	
		init.fadePanels = true;
		init.inPageEventTrack = true;	
		init.inPageEventLabel = 'GallerySlides';
		init.autoPlay = true;
		init.consoleDebug = false;		
		}
	
	/*private application variables */
	var slideCount = 3;
	
	var currentSlide =1;
	var totalSlides =0;
	var timePassed = 0;
	var timeToChange =3;
	var slidePassed = 1;
	
	/*console output*/ showDebug("init.consoleDebug = ",init.consoleDebug);
			
	 /*preload images*/
	 $liquid(init.panelImg).imgpreload(function(){
	 		initializeSlider();
	 });
	 
	 if(init.navStyle == 'overlay') {
	 	$liquid(init.panel).each(function(index){
	 		  totalSlides = index+1;
 			  if(init.inPageEventTrack) {
 				 var gEvent = googleEvent(init.inPageEventLabel,(totalSlides+'_'+1));
 				 $liquid(init.slideNav).append('<a class="slide_nav_item nav_item_'+totalSlides+' '+gEvent+'"></a>');
 			  }  else  {
 			  	$liquid(init.slideNav).append('<a class="slide_nav_item nav_item_'+totalSlides+'"></a>');
 			  }
	 	 });
	 	 
	 }
	 
	 if(init.navStyle == 'thumbnail') {
	 	$liquid(init.slideNav).append('<ul></ul>');
	 	$liquid(init.panel).each(function(index){
	 		  totalSlides = index+1;
	 		  if(init.inPageEventTrack) {
	 			 var gEvent = googleEvent(init.inPageEventLabel,(totalSlides+'_'+1));
	 			 $liquid(init.slideNav+' ul ').append('<li class="list_item_'+totalSlides+'"><a class="slide_nav_item nav_item_'+totalSlides+' '+gEvent+'"></a></li>');
	 		  }  else {
	 		  	$liquid(init.slideNav+' ul ').append('<li class="list_item_'+totalSlides+'"><a class="slide_nav_item nav_item_'+totalSlides+'"></a></li>');
	 		 }
	 	 });
	 }

	  
	  
	  // set up navigation click event
	  $liquid(init.slideNavLink).click( function() {
	  	  var navClicked = $liquid(this).index() + 1;
		  
		  if(init.navStyle == 'thumbnail') {
		  	//to test the clicked link position (index) in the li stack
		  	navClicked = $liquid(this).parents('li').index()+1;
		  	$liquid(init.slideNav+' ul li').removeClass('active');
		  	$liquid(selectNthChild(init.slideNav+' ul li',navClicked)).addClass('active');
		  }
		  
		  var distanceToMove = init.slideWidth * (-1);
		  var newPhotoPosition = (navClicked -1) * distanceToMove  + 'px';
		  
		  $liquid(init.slideNavLink).removeClass('selected'); // removes all selected from nav links
		  $liquid(this).addClass('selected'); // adds selected to the currently clicked nav link
		  
		  $liquid(init.slide).removeClass('slide_current');
		  $liquid(selectNthChild(init.slide,navClicked)).addClass('slide_current');
	  
		  currentSlide = navClicked;
		  
		  /* movement animation*/
		  if(init.fadePanels) { moveFadePanel(newPhotoPosition);
			  } else { movePanel(newPhotoPosition, init.slides); 
		  }
		  
		  slidePassed = currentSlide;
		  
	  }); /*end click event*/
	  
	  /* create slide containers*/
	  function getInitialValues() {
		  slideCount = $liquid(init.panel).length;
	  }
	  
	  function setSlides(){
		  $liquid(init.panel).each(function(index){
			  $liquid(init.slides).append('<div class="slide slide_'+(index+1)+'"></div>');
		  });
		  var myLength = slideCount*init.slideWidth;
		  $liquid(init.slides).css('width',myLength);
	  }
	  
	  function setSlideContents() {
		  $liquid(init.panel).each(function(index){
			  $liquid(selectNthChild(init.slide,index+1)).html(function(){
				  var slideHTML = $liquid(selectNthChild(init.panel,index+1)).html();
				  return slideHTML;
			  });
		  });
	  }
	  function setCaptionID() {
	  	$liquid(init.panel).each(function(index) {
	  		var captionID = 'caption_'+(index+1);
	  		$liquid(selectNthChild(init.slide,index+1)+' .caption').addClass(captionID);
	  	});
	  }
	  
	  /* initialize slider */
	  function initializeSlider(){
		  getInitialValues();
		  setSlides();
		  setSlideContents();
		  setCaptionID();
		  
		  $liquid(selectFirst(init.slide)).addClass('slide_current'); //was slide_current
		  $liquid(selectFirst(init.slideNavLink)).addClass('selected'); //was slide_current
		  if(init.navStyle == 'thumbnail') {
		  	$liquid(selectFirst(init.slideNav+' ul li')).addClass('active'); //was slide_current
		  }
		  $liquid(init.slides).fadeIn(init.fadeInSpeed);
		  if(init.fadePanels){initalizePanelOpacity(init.slide);}
	  }
	  
	  function initalizePanelOpacity(el){
	   $liquid(el).each(function(index){
		   if(index) { 
			  $liquid(selectNthChild(el,index+1)).fadeTo(10,0.01);
		   }
	   });
	  }
	  
	  /*function controls the transition style*/
	  function movePanel(newPos,el) {
		  $liquid(el).animate({left: newPos}, init.moveSlideSpeed);
	  }
	  
	  function moveFadePanel(newPos) {
		  /*fadeTo current*/
		  $liquid(selectNthChild(init.slide,slidePassed)).fadeTo('fast',0.01,function(){
			  /* moving action*/
				$liquid(init.slides).css('left', newPos);
				$liquid('.slide_current').fadeTo('fast',1);
		  });
		  /*fadeIn next*/	
	  }
	  
	  /*auto play timer*/
	  if(init.autoPlay){ setInterval(autoAdvance,init.nextSlideTime); }
	  
	  /*auto play function*/
	  function autoAdvance() {
		  if(timePassed == timeToChange){
			  /*console output*/ showDebug("timePassed == timeToChange ",timePassed);
			  timePassed = 0;
			  if(currentSlide == totalSlides){
				  currentSlide =0;
				  }
			  if(init.autoPlay == true) {
			  $liquid(selectNthChild(init.slideNavLink,currentSlide+1)).trigger('click');
			  }
		  } else {
			  timePassed += 1;
			  /*console output*/ showDebug("timePassed = ",timePassed);
		  }
	  }
	  /*auto play pause*/
	  $liquid(init.slides).hover(
		  function() {
			  init.autoPlay = false;
			  $liquid(this).removeClass('autoplay');
			  },
		  function() {
			  init.autoPlay = true;
			  timePassed = 0;
			  $liquid(this).addClass('autoplay');
			  }
	  );
	  
	  /*general functions	*/
	  function googleEvent(label,id) {
		  var googleEvent = 'onclick=\"_gaq.push([ \'_trackEvent\', \''+label+'\', \'view\', \'nav_item_'+id+'\']);\"';
		  return googleEvent;
	  }
	  /* returns the first selection element	*/
	  function selectFirst(el){
		  return el+':first';
		  }
		  
	  /* returns the Nth selection element	*/	
	  function selectNthChild(el,index){		
		  return el+':nth-child('+index+')';
	  }
	  
	  /* bugging function - outputs to the console firebug or google */
	  function showDebug(descrip,value){
			if(init.consoleDebug){console.log(descrip,value);}
	  }
	}
});
/* v1.4 */
/* https://github.com/farinspace/jquery.imgpreload */
/* Dimas Begunoff, http://www.farinspace.com */
if("undefined"!=typeof jQuery){(function(a){a.imgpreload=function(b,c){c=a.extend({},a.fn.imgpreload.defaults,c instanceof Function?{all:c}:c);if("string"==typeof b){b=new Array(b)}var d=new Array;a.each(b,function(e,f){var g=new Image;var h=f;var i=g;if("string"!=typeof f){h=a(f).attr("src");i=f}a(g).bind("load error",function(e){d.push(i);a.data(i,"loaded","error"==e.type?false:true);if(c.each instanceof Function){c.each.call(i)}if(d.length>=b.length&&c.all instanceof Function){c.all.call(d)}a(this).unbind("load error")});g.src=h})};a.fn.imgpreload=function(b){a.imgpreload(this,b);return this};a.fn.imgpreload.defaults={each:null,all:null}})(jQuery)}

