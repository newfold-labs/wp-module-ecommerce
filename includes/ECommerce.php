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
	 * @var Container
	 *
	 * Container loaded from Blueshot Repo
	 */
	protected $container;
	/**
	 * @var array
	 *
	 * Array map of API controllers
	 */
	protected $controllers = array(
		'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\PluginsController',
		'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\UserController',
	);
	/**
	 * @var array
	 *
	 * Option settings
	 */
	protected $options = array(
		'nfd-ecommerce-captive-flow-paypal',
		'nfd-ecommerce-captive-flow-shippo',
		'nfd-ecommerce-onboarding-check',
		'woocommerce_store_address',
		'woocommerce_store_address_2',
		'woocommerce_store_city',
		'woocommerce_store_postcode',
		'woocommerce_default_country',
		'wc_connect_taxes_enabled',
		'woocommerce_calc_taxes',
	);

	/**
	 * ECommerce constructor.
	 *
	 * @param Container $container
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
		// Module functionality goes here
		add_action( 'admin_bar_menu', array( $this, 'newfold_site_status' ), 200 );
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
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
	 * Registering API routes
	 */
	public function register_routes() {
		foreach ( $this->controllers as $Controller ) {
			/**
			 * Get an instance of the WP_REST_Controller.
			 *
			 * @var $instance WP_REST_Controller
			 */
			$instance = new $Controller();
			$instance->register_routes();
		}
		$this->register_settings();
	}

	/**
	 * TO register settings in local DB
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
	 * @param WP_Admin_Bar $admin_bar An instance of the WP_Admin_Bar class.
	 */
	public function newfold_site_status( \WP_Admin_Bar $admin_bar ) {
		if ( current_user_can( 'manage_options' ) ) {
			$is_coming_soon   = 'true' === get_option( 'mm_coming_soon', 'false' );
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
			$admin_bar->remove_menu( 'mojo-home' ); // Remove status added by bwp
		}
	}
}
