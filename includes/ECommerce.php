<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow;
use NewfoldLabs\WP\Module\ECommerce\Partials\WooCommerceBacklink;

/**
 * Class ECommerce
 *
 * @package NewfoldLabs\WP\Module\ECommerce
 */
class ECommerce {
	/**
	 * Main Ecommerce file
	 *
	 * Entry point via bootstrap.php
	 */

	/**
	 * Container loaded from the brand plugin.
	 *
	 * @var Container
	 */
	protected $container;

	/**
	 * Array map of API controllers.
	 *
	 * @var array
	 */
	protected $controllers = array(
		'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\PluginsController',
		'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\UserController',
	);

	/**
	 * Option settings
	 *
	 * @var array
	 */
	protected $options = array(
		'nfd-ecommerce-captive-flow-paypal',
		'nfd-ecommerce-captive-flow-shippo',
		'nfd-ecommerce-captive-flow-razorpay',
		'nfd-ecommerce-onboarding-check',
		'nfd-ecommerce-counter',
		'woocommerce_store_address',
		'woocommerce_store_address_2',
		'woocommerce_store_city',
		'woocommerce_store_postcode',
		'woocommerce_default_country',
		'wc_connect_taxes_enabled',
		'woocommerce_calc_taxes',
		'woocommerce_currency',
		'woocommerce_email_from_address',
	);

	/**
	 * ECommerce constructor.
	 *
	 * @param Container $container Container loaded from the brand plugin.
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
		// Module functionality goes here
		add_action( 'admin_bar_menu', array( $this, 'newfold_site_status' ), 200 );
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'load-toplevel_page_bluehost', array( $this, 'register_assets' ) );
		add_action( 'load-toplevel_page_crazy-domains', array( $this, 'register_assets' ) );
		add_filter( 'http_request_args', array( $this, 'replace_retired_bn_codes' ), 10, 2 );
		CaptiveFlow::init();
		WooCommerceBacklink::init();
		register_meta(
			'post',
			'nf_dc_page',
			array(
				'type'         => 'string',
				'description'  => 'Reference to page category',
				'show_in_rest' => true,
				'single'       => true,
			)
		);
	}

	/**
	 * Register API routes.
	 */
	public function register_routes() {
		foreach ( $this->controllers as $Controller ) {
			/**
			 * Get an instance of the WP_REST_Controller.
			 *
			 * @var $instance \WP_REST_Controller
			 */
			$instance = new $Controller( $this->container );
			$instance->register_routes();
		}
		$this->register_settings();
	}

	/**
	 * Register settings.
	 */
	public function register_settings() {
		$option_settings = array(
			'show_in_rest' => true,
			'type'         => 'string',
			'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
		);
		foreach ( $this->options as $option ) {
			\register_setting( 'general', $option, $option_settings );
		}
		\register_setting(
			'general',
			'woocommerce_no_sales_tax',
			array(
				'show_in_rest' => true,
				'type'         => 'boolean',
				'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
			)
		);
	}

	/**
	 * Customize the admin bar with site status.
	 *
	 * @param \WP_Admin_Bar $admin_bar An instance of the WP_Admin_Bar class.
	 */
	public function newfold_site_status( \WP_Admin_Bar $admin_bar ) {
		if ( current_user_can( 'manage_options' ) ) {
			$is_coming_soon   = 'true' === get_option( 'nfd_coming_soon', 'false' );
			$status           = $is_coming_soon
			? '<span id="nfd-site-status-text" style="color:#E01C1C;">' . esc_html__( 'Coming Soon', 'wp-module-ecommerce' ) . '</span>'
			: '<span id="nfd-site-status-text" style="color:#048200;">' . esc_html__( 'Live', 'wp-module-ecommerce' ) . '</span>';
			$site_status_menu = array(
				'id'     => 'site-status',
				'parent' => 'top-secondary',
				'href'   => admin_url( 'admin.php?page=bluehost#/home' ),
				'title'  => '<div style="background-color: #F8F8F8; padding: 0 16px;color:#333333;">' . esc_html__( 'Site Status: ', 'wp-module-ecommerce' ) . $status . '</div>',
				'meta'   => array(
					'title' => esc_attr__( 'Launch Your Site', 'wp-module-ecommerce' ),
				),
			);
			$admin_bar->add_menu( $site_status_menu );
			// Remove status added by newfold-labs/wp-module-coming-soon
			$menu_name = $this->container->plugin()->id . '-coming_soon';
			$admin_bar->remove_menu( $menu_name );
		}
	}

	/**
	 * Load WP dependencies into the page.
	 */
	public function register_assets() {
		$asset_file = NFD_ECOMMERCE_BUILD_DIR . 'index.asset.php';
		if ( file_exists( $asset_file ) ) {
			$asset = require_once $asset_file;
			\wp_enqueue_script(
				'nfd-ecommerce-dependency',
				NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/load-dependencies.js',
				array_merge( $asset['dependencies'], array() ),
				$asset_file
			);
		}
	}

	/**
	 * Ensure that any retired BN codes are not sent with outbound requests to Paypal
	 *
	 * @param array  $parsed_args An array of HTTP request arguments
	 * @param string $url         The request URL
	 *
	 * @return array Array of modified HTTP request arguments
	 */
	public function replace_retired_bn_codes( $parsed_args, $url ) {
		// Bail early if the request is not to paypal's v2 checkout API
		if ( false === stripos( wp_parse_url( $url, PHP_URL_HOST ), 'paypal.com' )
			&& false === stripos( wp_parse_url( $url, PHP_URL_PATH ), 'v2/checkout' ) ) {
			return $parsed_args;
		}

		// Check for an existing bn_code
		$bn_code = isset( $parsed_args['headers']['PayPal-Partner-Attribution-Id'] ) ? $parsed_args['headers']['PayPal-Partner-Attribution-Id'] : null;

		// Ensure we only set when blank, or when using one of our stale codes
		if ( is_null( $bn_code ) || false !== stripos( $bn_code, 'yith' ) || false !== stripos( $bn_code, 'newfold' ) ) {
			// The correct code is case sensitive. YITH brand is uppercase, but the code is not.
			$parsed_args['headers']['PayPal-Partner-Attribution-Id'] = 'Yith_PCP';
		}

		return $parsed_args;
	}
}
