<?php

function wp_script() {

	wp_enqueue_style( 'style-css', get_stylesheet_uri() );

	wp_enqueue_script( 'script-mainJs', get_template_directory_uri() . '/js/script.min.js' );
}
add_action( 'wp_enqueue_scripts', 'wp_script' );
