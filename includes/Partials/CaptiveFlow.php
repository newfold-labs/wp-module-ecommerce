<?php
namespace NewfoldLabs\WP\Module\ECommerce\Partials;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
/**
 * Class CaptiveFlow
 *
 * @package NewfoldLabs\WP\Module\ECommerce\Partials
 */
class CaptiveFlow {

	/**
	 * String Identifier for the PayPal captive flow.
	 *
	 * @var string $paypal_captive_flow
	 */
	public static $paypal_captive_flow = 'nfd-ecommerce-captive-flow-paypal';

	/**
	 * String Identifier for the Shippo captive flow.
	 *
	 * @var string $shippo_captive_flow
	 */
	public static $shippo_captive_flow = 'nfd-ecommerce-captive-flow-shippo';

	/**
	 * String Identifier for the Razorpay captive flow.
	 *
	 * @var string $razorpay_captive_flow
	 */
	public static $razorpay_captive_flow = 'nfd-ecommerce-captive-flow-razorpay';

	/**
	 * Initialize the plugin by registering necessary actions.
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'register_options' ) );
		add_action( 'load-admin_page_' . self::$paypal_captive_flow, array( __CLASS__, 'enqueue_styles' ), 100 );
		add_action( 'load-admin_page_' . self::$shippo_captive_flow, array( __CLASS__, 'enqueue_styles' ), 100 );
	}

	/**
	 * Register WooCommerce Razorpay settings options in the WordPress REST API.
	 *
	 * @return void
	 */
	public static function register_options() {
		\register_setting(
			'general',
			'woocommerce_razorpay_settings',
			array(
				'show_in_rest' => array(
					'schema' => array(
						'type'       => 'object',
						'properties' => array(
							'enabled'               => array(
								'type' => 'string',
							),
							'title'                 => array(
								'type' => 'string',
							),
							'description'           => array(
								'type' => 'string',
							),
							'key_id'                => array(
								'type' => 'string',
							),
							'key_secret'            => array(
								'type' => 'string',
							),
							'payment_action'        => array(
								'type' => 'string',
							),
							'order_success_message' => array(
								'type' => 'string',
							),
							'enable_1cc_debug_mode' => array(
								'type' => 'string',
							),
							'route_enable'          => array(
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

	/**
	 * Enqueue styles for specific admin pages related to captive flows.
	 *
	 * @return void
	 */
	public static function enqueue_styles() {
		\add_filter(
			'admin_body_class',
			static function ( $classes ) {
				return "$classes is-fullscreen-mode";
			}
		);
		\wp_enqueue_style( 'nfd-ecommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/template.css', null, '1', 'screen' );
	}

	/**
	 * Register submenu pages for PayPal and Shippo captive flows.
	 *
	 * @return void
	 */
	public static function register_page() {
		\add_submenu_page(
			'',
			'',
			'',
			Permissions::ADMIN,
			self::$paypal_captive_flow,
			array( __CLASS__, 'render_paypal' ),
			100
		);
		\add_submenu_page(
			'',
			'',
			'',
			Permissions::ADMIN,
			self::$shippo_captive_flow,
			array( __CLASS__, 'render_shippo' ),
			100
		);
	}

	/**
	 * Render function for the PayPal captive flow admin page.
	 *
	 * @return void
	 */
	public static function render_paypal() {
		echo PHP_EOL;
		echo '<div id="nfd-ecommerce" class="nfd-ecommerce-captive-flow">';
		do_action( self::$paypal_captive_flow );
		echo '</div>';
		echo PHP_EOL;
	}

	/**
	 * Render function for the Shippo captive flow admin page.
	 *
	 * @return void
	 */
	public static function render_shippo() {
		echo PHP_EOL;
		echo '<div id="nfd-ecommerce" class="nfd-ecommerce-captive-flow">';
		do_action( self::$shippo_captive_flow );
		echo '</div>';
		echo PHP_EOL;
	}
}
