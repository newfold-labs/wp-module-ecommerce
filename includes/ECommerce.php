<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\ECommerce\Data\Brands;
use NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow;
use NewfoldLabs\WP\Module\ECommerce\Partials\WooCommerceBacklink;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Data\SiteCapabilities;

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
	 * Identifier for script handle.
	 *
	 * @var string
	 */
	public static $handle_i18n = 'nfd-ecommerce-i18n';

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
		'nfd-ecommerce-captive-flow-stripe',
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
		'onboarding_experience_level',
		'yoast_seo_signup_status',
		'nfd_show_migration_steps',
		'update_site_server_clicked',
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
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'register_textdomains' ) );
		add_action( 'before_woocommerce_init', array( $this, 'hide_woocommerce_set_up' ) );
		add_action( 'before_woocommerce_init', array( $this, 'custom_payment_gateways_order' ) );
		add_action( 'before_woocommerce_init', array( $this, 'dismiss_woo_payments_cta' ) );
		add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'disable_creative_mail_banner' ) );
		// add_action( 'activated_plugin', array( $this, 'detect_plugin_activation' ), 10, 1 );
		add_action( 'wp_login', array( $this, 'show_store_setup' ) );
		add_action( 'auth_cookie_expired', array( $this, 'show_store_setup' ) );
		add_action( 'admin_head', array( $this, 'hide_wp_pointer_with_css' ) );
		add_action( 'admin_footer', array( $this, 'remove_woocommerce_ssl_notice' ), 20 );
		\add_filter( 'load_script_translation_file', array( $this, 'load_script_translation_file' ), 10, 3 );
		add_filter( 'woocommerce_admin_get_feature_config', array( $this, 'disable_modern_payments_settings' ), 999 );

		CaptiveFlow::init();
		WooCommerceBacklink::init( $container );
		register_meta(
			'post',
			'nf_dc_page',
			array(
				'type'         => 'string',
				'description'  => __( 'Reference to page category', 'wp-module-ecommerce' ),
				'show_in_rest' => true,
				'single'       => true,
			)
		);

		$this->add_filters(
			array( 'postbox_classes_page_wpseo_meta', 'postbox_classes_post_wpseo_meta', 'postbox_classes_product_wpseo_meta' ),
			function ( $classes ) {
				$classes[] = 'closed';
				return $classes;
			}
		);

		// Handle WonderCart Integrations
		if ( is_plugin_active( 'wonder-cart/init.php' ) ) {
			$wonder_cart = new WonderCart( $container );
			$wonder_cart->init();
		}

		// Load Quick Add Product feature.
		( new QuickAddProduct( $container ) )->init();
		// Load Store Quick Start feature.
		( new StoreInfo( $container ) )->init();

		add_filter( 'newfold_runtime', array( $this, 'add_to_runtime' ) );
	}

	/**
	 * Add multiple filters to a closure
	 *
	 * @param string|array $tags The filter name or array of filter names
	 * @param callable     $function_to_add The closure to add to the filter
	 * @param int|array    $priority The priority at which the closure should be added
	 * @param int|array    $accepted_args The number of arguments the closure accepts
	 *
	 * @return bool true
	 */
	public static function add_filters( $tags, $function_to_add, $priority = 10, $accepted_args = 1 ) {
		// If the filter names are not an array, create an array containing one item
		if ( ! is_array( $tags ) ) {
			$tags = array( $tags );
		}
			// For each filter name
		foreach ( $tags as $index => $tag ) {
			add_filter( $tag, $function_to_add, (int) ( is_array( $priority ) ? $priority[ $index ] : $priority ), (int) ( is_array( $accepted_args ) ? $accepted_args[ $index ] : $accepted_args ) );
		}

		return true;
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

	/**
	 * Add values to the runtime object.
	 *
	 * @param array $sdk The runtime object.
	 *
	 * @return array
	 */
	public function add_to_runtime( $sdk ) {
		$values = array(
			'brand_settings'         => Brands::get_config( $this->container ),
			'nonces'                 => array(
				'gateway_toggle' => \wp_create_nonce( 'woocommerce-toggle-payment-gateway-enabled' ),
			),
			'install_token'          => PluginInstaller::rest_get_plugin_install_hash(),
		);
		return array_merge( $sdk, array( 'ecommerce' => $values ) );
	}

	/**
	 * Redirect to the dashboard after WooCommerce activation.
	 */
	public function maybe_do_dash_redirect() {
		$show_dash = get_option( 'nfd_show_dash_after_woo_activation', false );
		if ( $show_dash && ! wp_doing_ajax() ) {
			update_option( 'nfd_show_dash_after_woo_activation', false );
			wp_safe_redirect( apply_filters( 'nfd_build_url', admin_url( 'admin.php?page=' . $this->container->plugin()->id . '#/home' ) ) );
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
		\register_setting(
			'general',
			'bluehost_academy_signup_clicked',
			array(
				'show_in_rest' => true,
				'type'         => 'boolean',
				'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
			)
		);
		\register_setting(
			'general',
			'yoast_seo_signup_status',
			array(
				'show_in_rest' => true,
				'type'         => 'boolean',
				'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
			)
		);
		\register_setting(
			'general',
			'update_site_server_clicked',
			array(
				'show_in_rest' => true,
				'type'         => 'boolean',
				'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
			)
		);
		\register_setting(
			'general',
			'nfd_show_migration_steps',
			array(
				'show_in_rest' => true,
				'type'         => 'boolean',
				'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
			)
		);
		$payments                    = array(
			'woocommerce_bacs_settings',
			'woocommerce_cod_settings',
			'woocommerce_cheque_settings',
		);
		$schema_for_offline_payments = array(
			'show_in_rest' => array(
				'schema' => array(
					'type'       => 'object',
					'properties' => array(
						'gateway_id' => array(
							'type' => 'string',
						),
						'enabled'    => array(
							'type' => 'string',
						),
						'action'     => array(
							'type' => 'string',
						),
						'security'   => array(
							'type' => 'string',
						),
					),
				),
			),
			'type'         => 'object',
			'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
		);
		foreach ( $payments as $payment ) {
			\register_setting( 'general', $payment, $schema_for_offline_payments );
		}

		register_setting(
			'general',
			'is_fse_theme',
			array(
				'type'         => 'boolean',
				'show_in_rest' => true,
				'default'      => wp_is_block_theme(), // Set default value based on current theme
			)
		);
	}

	/**
	 * Filters the file path for the JS translation JSON.
	 *
	 * If the script handle matches the module's handle, builds a custom path using
	 * the languages directory, current locale, text domain, and a hash of the script.
	 *
	 * @param string $file   Default translation file path.
	 * @param string $handle_i18n Script handle.
	 * @param string $domain Text domain.
	 * @return string Modified file path for the translation JSON.
	 */
	public function load_script_translation_file( $file, $handle_i18n, $domain ) {

		if ( $handle_i18n === self::$handle_i18n ) {
			$path   = NFD_ECOMMERCE_DIR . '/languages/';
			$locale = determine_locale();

			$file_base = 'default' === $domain
				? $locale
				: $domain . '-' . $locale;
			$file      = $path . $file_base . '-' . md5( 'build/index.js' ) . '.json';

		}
		return $file;
	}

	/**
	 * Load the textdomains for the module.
	 */
	public function register_textdomains() {
		$MODULE_LANG_DIR  = $this->container->plugin()->dir . 'vendor/newfold-labs/wp-module-ecommerce/languages';

		\load_textdomain(
			'wp-module-ecommerce',
			$MODULE_LANG_DIR
		);
		// load textdomain for scripts
		\load_script_textdomain(
			self::$handle_i18n,
			'wp-module-ecommerce',
			$MODULE_LANG_DIR
		);
	}

	/**
	 * Hide the WooCommerce set up task list
	 */
	public function hide_woocommerce_set_up() {
		$hidden_list = get_option( 'woocommerce_task_list_hidden_lists', array() );
		if ( ! in_array( 'setup', $hidden_list, true ) ) {
			$woocommerce_list = array_merge(
				get_option( 'woocommerce_task_list_hidden_lists', array() ),
				array(
					'setup',
				)
			);
			update_option( 'woocommerce_task_list_hidden_lists', $woocommerce_list );
		}
	}

	/**
	 * Change the order of payment gateways
	 */
	public function custom_payment_gateways_order() {
		$array_data = array(
			'pre_install_woocommerce_payments_promotion' => 2,
			'yith_paypal_payments'                       => 0,
			'element'                                    => 1,
		);
		update_option( 'woocommerce_gateway_order', $array_data );
	}

	/**
	 * Dismisses the WooCommerce Payments CTA
	 */
	public function dismiss_woo_payments_cta() {
		$is_dismissed = get_option( 'wcpay_welcome_page_incentives_dismissed' );
		if ( ! is_array( $is_dismissed ) || empty( $is_dismissed ) ) {
			update_option( 'wcpay_welcome_page_incentives_dismissed', array( 'wcpay-promo-2023-action-discount' ) );
		}
	}

	/**
	 * Disables the creative mail banner
	 */
	public function disable_creative_mail_banner() {
		$is_dismissed = get_option( 'ce4wp_ignore_review_notice' );
		if ( ! is_array( $is_dismissed ) || empty( $is_dismissed ) ) {
			update_option( 'ce4wp_ignore_review_notice', true );
		}
	}

	/**
	 *  Activates yith payment plugins (PayPal, Stripe) when woocommerce is activated
	 *
	 * @param string $plugin Path to the plugin file relative
	 *
	 * @return void
	 */
	public function detect_plugin_activation( $plugin ) {
		/*
		* Commented out to avoid installing the plugins again when the module is activated.
		* TODO - Reinstate with update to new Payments & Shipping plugin

		$plugin_slugs = array(
			'nfd_slug_yith_paypal_payments_for_woocommerce',
			'nfd_slug_yith_stripe_payments_for_woocommerce',
		);
		if ( 'woocommerce/woocommerce.php' === $plugin ) {
			foreach ( $plugin_slugs as $plugin ) {
				PluginInstaller::install( $plugin, true );
			}
		}
		*/
		// do nothing for now
		return;
	}

	/**
	 * Hide WooCommerce SSL notice
	 *
	 * @return void
	 */
	public function remove_woocommerce_ssl_notice() {

		// Check if WooCommerce is active.
		if ( ! class_exists( 'WooCommerce' ) ) {
			return;
		}

		if ( ! is_ssl() ) {
			// Check if there are any WooCommerce admin notices, find the one with ssl notice link and hide it.
			?>
				<script type="text/javascript">
					jQuery(document).ready(function($) {
						if ($('.updated.woocommerce-message').length) {
							$('.updated.woocommerce-message').each(function() {
								var $message = $(this);
								var $link = $message.find('a[href="https://woocommerce.com/document/ssl-and-https/"]');

								if ($link.length > 0) {
									$message.hide();
								}
							});
						}
					});
				</script>
			<?php
		}
	}

	/**
	 * Verifies if the url is matching with the regex
	 *
	 * @param string $brand_name id of the brand
	 *
	 * @param string $site_url siteurl
	 */
	public function check_url_match( $brand_name, $site_url ) {
		switch ( $brand_name ) {
			case 'bluehost':
				return ! preg_match( '/\b\w+(\.\w+)*\.mybluehost\.me\b/', $site_url );
			case 'hostgator':
				return ! preg_match( '/\b\w+(\.\w+)*\.temporary\.site\b/', $site_url );
			default:
				return true;
		}
	}

	/**
	 * On login, it checks whether to show the migration steps, post migration to user
	 */
	public function show_store_setup() {
		$site_url = get_option( 'siteurl', false );
		$brand    = $this->container->plugin()->id;

		if ( $this->check_url_match( $brand, $site_url ) ) {
			update_option( 'nfd_show_migration_steps', false );
		}
	}

	/**
	 * Suppress WP-Form Notice using css
	 *
	 * @return void
	 */
	public function hide_wp_pointer_with_css() {
		echo '<style>
			.wp-pointer { display: none !important; }
		</style>';
	}

	/**
	 * Force WooCommerce to use the old Payments settings page.
	 *
	 * WooCommerce 9.7+ introduces a new Payments settings page.
	 * This function disables it and keeps the classic version.
	 *
	 * @param array $features Existing WooCommerce feature configurations.
	 * @return array Modified feature configuration with modern Payments settings disabled.
	 */
	public function disable_modern_payments_settings( $features ) {
		$features['reactify-classic-payments-settings'] = false;
		return $features;
	}
}
