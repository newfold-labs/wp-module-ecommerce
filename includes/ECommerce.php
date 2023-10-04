<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\ECommerce\Data\Brands;
use NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow;
use NewfoldLabs\WP\Module\ECommerce\Partials\WooCommerceBacklink;
use NewfoldLabs\WP\Module\ECommerce\I18nService;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\ModuleLoader\Container;

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
		'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\IntegrationsController',
		'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\PluginsController',
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
		'woocommerce_bacs_settings',
        'woocommerce_cod_settings',
        'woocommerce_cheque_settings',
	);

	/**
	 * ECommerce constructor.
	 *
	 * @param Container $container Container loaded from the brand plugin.
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
		// Module functionality goes here		
		add_action( 'init', array( $this, 'load_php_textdomain' ) );
		add_action( 'admin_init', array( $this, 'maybe_do_dash_redirect' ) );
		add_action( 'admin_bar_menu', array( $this, 'newfold_site_status' ), 200 );
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'register_assets' ) );
		add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'register_textdomains' ) );
		CaptiveFlow::init();
		WooCommerceBacklink::init( $container );
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
		add_filter( 'newfold-runtime', array( $this, 'add_to_runtime' ) );
		add_filter( "postbox_classes_page_wpseo_meta", function( $classes ) {
			$classes[] = 'closed';
			return $classes;			
		}, 10, 1 );
		add_filter( "postbox_classes_post_wpseo_meta", function( $classes ) {
			$classes[] = 'closed';
			return $classes;			
		}, 10, 1 );
	}

	/**
	 * Loads the textdomain for the module. This applies only to PHP strings.
	 *
	 * @return boolean
	 */
	public static function load_php_textdomain() {
		return I18nService::load_php_translations(
			'wp-module-ecommerce',
			NFD_ECOMMERCE_PLUGIN_DIRNAME . '/vendor/newfold-labs/wp-module-ecommerce/languages'
		);
	}

	public function add_to_runtime( $sdk ) {
		$values = array(
			'brand_settings' => Brands::get_config( $this->container ),
			'nonces' => array(
				'gateway_toggle' => \wp_create_nonce( 'woocommerce-toggle-payment-gateway-enabled' )
			),
			'install_token' => PluginInstaller::rest_get_plugin_install_hash()
		);
		return array_merge( $sdk, array( 'ecommerce' => $values ) );
	}

	public function maybe_do_dash_redirect() {
		$show_dash = get_option( 'nfd_show_dash_after_woo_activation', false );
		if ( $show_dash && !wp_doing_ajax() ) {
			update_option( 'nfd_show_dash_after_woo_activation', false );
			wp_safe_redirect( admin_url('admin.php?page=' . $this->container->plugin()->id . '#/home') );
		}
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
		$payments = array(
			'woocommerce_bacs_settings',
			'woocommerce_cod_settings',
			'woocommerce_cheque_settings'
		);
		$schema_for_offline_payments = array(
			'show_in_rest' => array(
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'gateway_id' => array(
							'type' => 'string',
						),
						'enabled' => array(
							'type' => 'string',
						),
						'action' => array(
							'type' => 'string',
						),
						'security' => array(
							'type' => 'string',
						),
					),
				),
			),
			'type'         => 'object',
			'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
		);
		foreach ( $payments as $payment ) {
			\register_setting( 'general', $payment, $schema_for_offline_payments);
		}
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
				'href'   => admin_url('admin.php?page=' . $this->container->plugin()->id . '#/home'),
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

	public function register_textdomains() {
		$MODULE_LANG_DIR = $this->container->plugin()->dir . 'vendor/newfold-labs/wp-module-ecommerce/languages';
		\load_script_textdomain( 'nfd-ecommerce-dependency', 'wp-module-ecommerce', $MODULE_LANG_DIR );
		\load_textdomain( 'wp-module-ecommerce', $MODULE_LANG_DIR );
	}

	/**
	 * Load WP dependencies into the page.
	 */
	public function register_assets() {
		$asset_file = NFD_ECOMMERCE_BUILD_DIR . 'index.asset.php';
		if ( file_exists( $asset_file ) ) {
			$asset = require $asset_file;
			\wp_register_script(
				'nfd-ecommerce-dependency',
				NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/load-dependencies.js',
				array_merge( $asset['dependencies'], array() ),
				$asset['version']
			);
			I18nService::load_js_translations(
				'wp-module-ecommerce',
				'nfd-ecommerce-dependency',
				NFD_ECOMMERCE_DIR . '/languages'
			);
			\wp_enqueue_script( 'nfd-ecommerce-dependency' );
		}
	}

}
