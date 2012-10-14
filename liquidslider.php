<?php
/*
Plugin Name: LiquidSlider
Plugin URI: liuqidbook.com
Description: This plugin contains support files for LiquidSlider
Version: 1
Author: Felipe Lujan-Bear
Author URI: liuqidbook.com
*/

// Start this plugin 
add_action( 'init', 'loadLiquidSlider' );
add_action( 'wp_head', 'liquidslider');
add_action( 'wp_enqueue_scripts', 'liquid_add_styles' );

function loadLiquidSlider() {
		// Load the local script
		wp_enqueue_script( 'imgpreload', plugins_url( 'jquery.imgpreload.js', __FILE__ ) , array( 'jquery' ), '20121014' );
		wp_enqueue_script( 'liquidslider', plugins_url( 'liquidslider.js', __FILE__ ) , array( 'jquery' ), '20121014' );
		
}

function liquid_add_styles() {
        // Respects SSL, Style.css is relative to the current file
        wp_register_style( 'liquidslider-style', plugins_url('css/liquidslide.css', __FILE__) );
        wp_enqueue_style( 'liquidslider-style' ); }


function liquidslider() {

?>
<?php if ( is_home() OR is_front_page() ) { ?>
<script type="text/javascript">
/*
// init Object labels
// init.panelImg , init.panel,init.panelImgFirst, init.slides,init.slide, init.slideNav, init.slideNavLink, init.navStyle,
// init.moveSlideSpeed, init.nextSlideTime, init.fadeInSpeed, init.fadePanels, init.inPageEventTrack, init.inPageEventLabel, init.autoPlay, init.consoleDebug;
*/	
var config = [ '.panel img','#panels .panel','.panel:first img:first','#slides',
	 '#slides .slide', '.slide_nav', '.slide_nav_item',959,'overlay',  1000, 3000,1500, true, false,'HomeSlides',true, false ];	
var $jq = jQuery.noConflict(); 
	$jq(document).ready(function(){ 
	liquidslider(config);
	});
</script>
<?php } ?>
<?php if (is_page('products')) { ?>
<script type="text/javascript">
var config = [ '.panel img','#panels .panel','.panel:first img:first','#slides',
	 '#slides .slide', '.slide_nav_products', '.slide_nav_item',960,'thumbnail',  1000, 3000,1500, true, false,'GallerySlides', false,true ];	
var $jq = jQuery.noConflict(); 
	$jq(document).ready(function(){ 
	liquidslider(config);
	});
</script>
<?php } ?>
<?php
}
