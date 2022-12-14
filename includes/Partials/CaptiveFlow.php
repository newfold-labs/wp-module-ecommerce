<?php
namespace NewfoldLabs\WP\Module\ECommerce\Partials;

use NewfoldLabs\WP\Module\ECommerce\Permissions;

class CaptiveFlow {

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		add_action( 'load-admin_page_' . 'nfd-ecommerce-captive-flow-paypal', array( __CLASS__, 'enqueue_styles' ), 100 );
		add_action( 'load-admin_page_' . 'nfd-ecommerce-captive-flow-shippo', array( __CLASS__, 'enqueue_styles' ), 100 );
	}

	public static function enqueue_styles() {
		\add_filter(
			'admin_body_class',
			static function( $classes ) {
				return "$classes is-fullscreen-mode";
			}
		);
		\wp_enqueue_style( 'nfd-ecommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/template.css', null, '1', 'screen' );
	}

	public static function register_page() {
		\add_submenu_page(
			null,
			null,
			null,
			Permissions::ADMIN,
			'nfd-ecommerce-captive-flow-paypal',
			array( __CLASS__, 'render_paypal' ),
			100
		);
		\add_submenu_page(
			null,
			null,
			null,
			Permissions::ADMIN,
			'nfd-ecommerce-captive-flow-shippo',
			array( __CLASS__, 'render_shippo' ),
			100
		);
	}

	public static function render_paypal() {
		echo PHP_EOL;
		echo '<div id="nfd-ecommerce" class="nfd-ecommerce-captive-flow">';
		echo do_action( 'nfd-ecommerce-captive-flow-paypal' );
		echo '</div>';
		echo PHP_EOL;
	}

	public static function render_shippo() {
		echo PHP_EOL;
		echo '<div id="nfd-ecommerce" class="nfd-ecommerce-captive-flow">';
		echo do_action( 'nfd-ecommerce-captive-flow-shippo' );
		echo '</div>';
		echo PHP_EOL;
	}
}
