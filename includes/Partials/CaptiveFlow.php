<?php
namespace NewfoldLabs\WP\Module\ECommerce\Partials;

use NewfoldLabs\WP\Module\ECommerce\Permissions;

class CaptiveFlow {

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		add_action( 'load-dashboard_page_' . 'nfd-ecommerce-captive-flow', array( __CLASS__, 'enqueue_styles' ), 100 );
	}

	public static function enqueue_styles() {
		\add_filter(
			'admin_body_class',
			static function( $classes ) {
				return "$classes is-fullscreen-mode";
			}
		);
		\wp_enqueue_style( 'nfd-ecommerce-captive', BLUEHOST_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/template.css', null, '1', 'screen');
	}

	public static function register_page() {
		\add_submenu_page(
				null,
				null,
				null,
				Permissions::ADMIN,
				'nfd-ecommerce-captive-flow',
				array( __CLASS__, 'render' ),
				100
		);
	}

	public static function render() {
		echo PHP_EOL;
		echo '<div id="nfd-ecommerce" class="nfd-ecommerce-captive-flow"><p>Text</p></div>';
		echo PHP_EOL;
	}

}