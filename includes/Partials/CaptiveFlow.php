<?php
namespace NewfoldLabs\WP\Module\ECommerce\Partials;

use NewfoldLabs\WP\Module\ECommerce\Permissions;

class CaptiveFlow {

	static $PAYPAL_CAPTIVE_FLOW = 'nfd-ecommerce-captive-flow-paypal';
	static $SHIPPO_CAPTIVE_FLOW = 'nfd-ecommerce-captive-flow-shippo';
	static $RAZORPAY_CAPTIVE_FLOW = 'nfd-ecommerce-captive-flow-razorpay';

	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'register_options' ) );
		add_action( 'load-admin_page_' . self::$PAYPAL_CAPTIVE_FLOW, array( __CLASS__, 'enqueue_styles' ), 100 );
		add_action( 'load-admin_page_' . self::$SHIPPO_CAPTIVE_FLOW, array( __CLASS__, 'enqueue_styles' ), 100 );
	}

	public static function register_options() {
		\register_setting(
			'general',
			'woocommerce_razorpay_settings',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type'  => 'object',
						'properties' => array(
							'enabled' => array(
								'type' => 'string',
							),
							'title' => array(
								'type' => 'string',
							),
							'description' => array(
								'type' => 'string',
							),
							'key_id' => array(
								'type' => 'string',
							),
							'key_secret' => array(
								'type' => 'string',
							),
							'payment_action' => array(
								'type' => 'string',
							),
							'order_success_message' => array(
								'type' => 'string',
							),
							'enable_1cc_debug_mode' => array(
								'type' => 'string',
							),
							'route_enable' => array(
								'type' => 'string',
							),
						),
					),
				),
				'type'         => 'object',
				'description'  => __( 'NFD eCommerce RazorPay Options', 'wp-module-ecommerce' ),
			)
		);
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
			self::$PAYPAL_CAPTIVE_FLOW,
			array( __CLASS__, 'render_paypal' ),
			100
		);
		\add_submenu_page(
			null,
			null,
			null,
			Permissions::ADMIN,
			self::$SHIPPO_CAPTIVE_FLOW,
			array( __CLASS__, 'render_shippo' ),
			100
		);
	}

	public static function render_paypal() {
		echo PHP_EOL;
		echo '<div id="nfd-ecommerce" class="nfd-ecommerce-captive-flow">';
		echo do_action( self::$PAYPAL_CAPTIVE_FLOW );
		echo '</div>';
		echo PHP_EOL;
	}

	public static function render_shippo() {
		echo PHP_EOL;
		echo '<div id="nfd-ecommerce" class="nfd-ecommerce-captive-flow">';
		echo do_action( self::$SHIPPO_CAPTIVE_FLOW );
		echo '</div>';
		echo PHP_EOL;
	}
}
