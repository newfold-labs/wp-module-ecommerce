<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\ECommerce\Data\Brands;
use NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow;
use NewfoldLabs\WP\Module\ECommerce\Partials\WooCommerceBacklink;
use NewfoldLabs\WP\Module\ECommerce\I18nService;
use NewfoldLabs\WP\Module\ECommerce\WonderCart;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;
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
		add_action( 'toplevel_page_' . $container->plugin()->id, array( $this, 'load_experience_level' ) );
		add_action( 'admin_init', array( $this, 'maybe_do_dash_redirect' ) );
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'register_assets' ) );
		add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'register_textdomains' ) );
		add_filter( 'woocommerce_coupons_enabled', array( $this, 'disable_coupon_field_on_cart' ) );
		add_filter( 'woocommerce_before_cart', array( $this, 'hide_banner_notice_on_cart' ) );
		add_action( 'before_woocommerce_init', array( $this, 'hide_woocommerce_set_up' ) );
		add_action( 'before_woocommerce_init', array( $this, 'custom_payment_gateways_order' ) );
		add_action( 'before_woocommerce_init', array( $this, 'dismiss_woo_payments_cta' ) );
		add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'disable_creative_mail_banner' ) );
		add_action( 'activated_plugin', array( $this, 'detect_plugin_activation' ), 10, 1 );
		add_action( 'admin_init', array( $this, 'hide_columns' ) );
		add_filter( 'manage_posts_columns', array( $this, 'custom_status_column' ), 10, 1 );
		add_action( 'manage_posts_custom_column', array( $this, 'custom_status_column_content' ), 10, 2 );
		add_filter( 'manage_pages_columns', array( $this, 'custom_status_column' ), 10, 1 );
		add_action( 'manage_pages_custom_column', array( $this, 'custom_status_column_content' ), 10, 2 );
		add_filter( 'manage_edit-post_sortable_columns', array( $this, 'sortable_columns' ) );
		add_filter( 'manage_edit-page_sortable_columns', array( $this, 'sortable_columns' ) );
		add_action( 'wp_login', array( $this, 'show_store_setup' ) );
		add_action( 'auth_cookie_expired', array( $this, 'show_store_setup' ) );
		add_action( 'admin_head', array( $this, 'hide_wp_pointer_with_css' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'set_wpnav_collapse_setting' ) );
		add_action( 'admin_footer', array( $this, 'remove_woocommerce_ssl_notice' ), 20 );

		add_action( 'init', array( $this, 'admin_init_conditional_on_capabilities' ) );

		// Handle WonderCart Integrations
		if ( is_plugin_active( 'wonder-cart/init.php' ) ) {
			$wonder_cart = new WonderCart( $container );
			$wonder_cart->init();
		}

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
		add_filter( 'newfold_runtime', array( $this, 'add_to_runtime' ) );
		$this->add_filters(
			array( 'postbox_classes_page_wpseo_meta', 'postbox_classes_post_wpseo_meta', 'postbox_classes_product_wpseo_meta' ),
			function ( $classes ) {
				$classes[] = 'closed';
				return $classes;
			}
		);
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
	 * Set the wpnav_collapse setting
	 */
	public function set_wpnav_collapse_setting() {

		$brandNameValue = $this->container->plugin()->brand;
		wp_enqueue_script( 'nfd_wpnavbar_setting', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/wpnavbar.js', array( 'jquery' ), '1.0', true );
		$params = array( 'nfdbrandname' => $brandNameValue );
		wp_localize_script( 'nfd_wpnavbar_setting', 'navBarParams', $params );
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
	 * Update the experience level
	 */
	public static function load_experience_level() {
		update_option( 'onboarding_experience_level', FlowService::get_experience_level() );
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
			'brand_settings' => Brands::get_config( $this->container ),
			'nonces'         => array(
				'gateway_toggle' => \wp_create_nonce( 'woocommerce-toggle-payment-gateway-enabled' ),
			),
			'install_token'  => PluginInstaller::rest_get_plugin_install_hash(),
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
			wp_safe_redirect( admin_url( 'admin.php?page=' . $this->container->plugin()->id . '#/home' ) );
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
	}

	/**
	 * Load the textdomains for the module.
	 */
	public function register_textdomains() {
		$MODULE_LANG_DIR = $this->container->plugin()->dir . 'vendor/newfold-labs/wp-module-ecommerce/languages';
		\load_script_textdomain( 'nfd-ecommerce-dependency', 'wp-module-ecommerce', $MODULE_LANG_DIR );
		$current_language = get_locale();
		\load_textdomain( 'wp-module-ecommerce', $MODULE_LANG_DIR . '/wp-module-ecommerce-' . $current_language . '.mo' );
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
				NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/build/index.js',
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

	/**
	 * Remove Add coupon field on cart page
	 *
	 * @param boolean $enabled The enabled status of the coupon field.
	 */
	public function disable_coupon_field_on_cart( $enabled ) {
		if ( is_cart() ) {
			$enabled = false;
		}
		return $enabled;
	}

	/**
	 * Remove notice banner on cart page
	 */
	public function hide_banner_notice_on_cart() {
		if ( is_cart() ) {
			?>
		<style>
		.wc-block-components-notice-banner, .ywgc_enter_code {
			display: none;
		}
		</style>
			<?php
		}
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
	 * Add promotion (Promote) under WooCommerce Marketing tab
	 */
	public function custom_add_promotion_menu_item() {
		add_submenu_page(
			'woocommerce-marketing',
			'Promotion product Page',
			__( 'Promotions', 'wp-module-ecommerce' ),
			'manage_options',
			$this->container->plugin()->id . '#/store/sales_discounts',
			'custom_submenu_redirect'
		);
	}


	/**
	 * Add a Promotion button under Add New product tab
	 */
	public function custom_product_general_options() {
		global $post;
		$redirect_url = admin_url( 'admin.php?page=' . $this->container->plugin()->id . '#/store/sales_discounts' );
		wp_enqueue_style( 'Create_a_Promotion', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Promotions.css', array(), '1.0', 'all' );
		echo '<div class="options_group">
            <p class="form-field custom-button-field">
						  <a id="Create_a_Promotion" href="' . esc_url( $redirect_url ) . '" class="promotion">' . esc_html( __( 'Create a Promotion', 'wp-module-ecommerce' ) ) . '</a>
					  </p>
          </div>';
	}

	/**
	 * Add a Custom tab (Prmotions tab) button added below Advance tab
	 *
	 * @param array $tabs The tabs.
	 */
	public function custom_product_write_panel_tabs( $tabs ) {
		$tabs['custom_tab'] = array(
			'label'    => __( 'Promotions', 'wp-module-ecommerce' ),
			'target'   => 'promotion_product_data',
			'priority' => 70,
			'class'    => array(),
		);
		return $tabs;
	}

	/**
	 * Content on click of a Custom tab (Promotions tab) button added below Advance tab
	 */
	public function promotion_product_data() {
		$redirect_url = 'admin.php?page=' . $this->container->plugin()->id . '#/store/sales_discounts';
		global $post;
		echo '<div id="promotion_product_data" class="panel woocommerce_options_panel hidden"></div>';
		\wp_enqueue_script( 'nfd_promotion_product_data', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Promotions.js', array( 'jquery' ), '1.0', true );
		$Promotion_data = array(
			'redirectUrl'            => $redirect_url,
			'boostYourOnline'        => __( 'Boost Your Online Store Sales', 'wp-module-ecommerce' ),
			'maximizeYourSales'      => __( 'Maximize your sales by creating effective', 'wp-module-ecommerce' ),
			'promotionsAndCampaigns' => __( 'promotions and campaigns like:', 'wp-module-ecommerce' ),
			'createPromotion'        => __( 'Create a Promotion', 'wp-module-ecommerce' ),
			'free'                   => __( 'Free', 'wp-module-ecommerce' ),
			'shipping'               => __( 'Shipping', 'wp-module-ecommerce' ),
			'buyOne'                 => __( 'Buy One', 'wp-module-ecommerce' ),
			'getOne'                 => __( 'Get One', 'wp-module-ecommerce' ),
			'freeGift'               => __( 'Free Gift', 'wp-module-ecommerce' ),
			'inCart'                 => __( 'in Cart', 'wp-module-ecommerce' ),
			'frequently'             => __( 'Frequently', 'wp-module-ecommerce' ),
			'boughtTogether'         => __( 'Bought Together', 'wp-module-ecommerce' ),

		);
		wp_localize_script( 'nfd_promotion_product_data', 'promotionData', $Promotion_data );
	}

	/**
	 * Change icon for a Custom tab (Promotions tab) button added below Advance tab
	 */
	public function action_admin_head() {
		echo '<style>
				#woocommerce-product-data ul.wc-tabs li.custom_tab_options a::before {
					content: "\f323";
				} 
		</style>';
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
		$plugin_slugs = array(
			'nfd_slug_yith_paypal_payments_for_woocommerce',
			'nfd_slug_yith_stripe_payments_for_woocommerce',
		);
		if ( 'woocommerce/woocommerce.php' === $plugin ) {
			foreach ( $plugin_slugs as $plugin ) {
				PluginInstaller::install( $plugin, true );
			}
		}
	}

	/**
	 * Hide Most columns by default
	 * Shows title and date in the page/post screen by default
	 *
	 * @return void
	 */
	public function hide_columns() {
		if ( 1 == get_option( 'onboarding_experience_level' ) ) {
			if ( ! get_user_meta( get_current_user_id(), 'manageedit-pagecolumnshidden' ) ) {
				update_user_meta( get_current_user_id(), 'manageedit-pagecolumnshidden', array( 'author', 'comments', 'date', 'wpseo-score', 'wpseo-score-readability', 'wpseo-title', 'wpseo-metadesc', 'wpseo-focuskw', 'wpseo-links' ) );
			}
			if ( ! get_user_meta( get_current_user_id(), 'manageedit-postcolumnshidden' ) ) {
				update_user_meta( get_current_user_id(), 'manageedit-postcolumnshidden', array( 'author', 'categories', 'tags', 'comments', 'date', 'wpseo-score', 'wpseo-score-readability', 'wpseo-title', 'wpseo-metadesc', 'wpseo-focuskw', 'wpseo-links' ) );
			}
		}
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
	 * Add actions and filters that are conditionally added depending on the Site's capabilities.
	 *
	 * Running the capabilities check after `admin_init` with `is_admin()` `true` ensures no HTTP requests are made
	 * for frontend page loads.
	 *
	 * `admin_init` runs in `wp-admin/admin.php:175`, `wp-admin/admin-ajax.php:45`, and `wp-admin/admin-post:30`.
	 * Each of the hooks in this function are UI (HTML) related, so only need to run inside `is_admin()`.
	 *
	 * @hooked admin_init
	 */
	public function admin_init_conditional_on_capabilities() {

		if ( ! ( is_admin() && current_user_can( 'manage_options' ) ) ) {
			return;
		}

		$capability         = new SiteCapabilities();
		$hasYithExtended    = $capability->get( 'hasYithExtended' );
		$canAccessGlobalCTB = $capability->get( 'canAccessGlobalCTB' );

		if (
				( $this->container->plugin()->id === 'bluehost' && ( $canAccessGlobalCTB || $hasYithExtended ) )
				|| ( $this->container->plugin()->id === 'hostgator' && $hasYithExtended )
		) {
			add_filter( 'admin_menu', array( $this, 'custom_add_promotion_menu_item' ) );
			add_action( 'woocommerce_product_options_general_product_data', array( $this, 'custom_product_general_options' ) );
			add_action( 'woocommerce_product_options_related', array( $this, 'custom_product_general_options' ) );
			add_action( 'woocommerce_product_data_tabs', array( $this, 'custom_product_write_panel_tabs' ) );
			add_action( 'woocommerce_product_data_panels', array( $this, 'promotion_product_data' ) );
			add_action( 'admin_head', array( $this, 'action_admin_head' ) );
		}
	}

	/**
	 * Add custom column header for post/page/product screen
	 *
	 * @param array $columns Array of column names for posts/pages
	 */
	public function custom_status_column( $columns ) {
		if ( 'product' !== get_post_type() && 1 == get_option( 'onboarding_experience_level' ) ) {
			// Add 'Status' column after 'Title'
			$columns['status'] = __( 'Status', 'wp-module-ecommerce' );
		}
		return $columns;
	}

	/**
	 * Shows status and availability under status
	 *
	 * @param string $column_name column names to which content needs to be updated
	 *
	 * @param int    $post_id Id of post/page
	 */
	public function custom_status_column_content( $column_name, $post_id ) {
		if ( 'status' === $column_name ) {
			// Get the post status
			$post_status = get_post_status( $post_id );
			// Get the post date
			$post_date = get_post_field( 'post_date', $post_id );
			// Get the post visibility
			$post_visibility = get_post_field( 'post_password', $post_id );

			$common_style = 'height: 24px; border-radius: 13px 13px 13px 13px;  gap: 16px; padding: 5px 10px; font-weight: 590;font-size: 12px;';
			if ( 'publish' === $post_status ) {
				$background_color = empty( $post_visibility ) ? '#C6E8CA' : '#FDE5CC';
				$label_text       = empty( $post_visibility ) ? __( 'Published - Public', 'wp-module-ecommerce' ) : __( 'Published - Password Protected', 'wp-module-ecommerce' );
			} elseif ( 'private' === $post_status ) {
				$background_color = '#CCDCF4';
				$label_text       = __( 'Published - Private', 'wp-module-ecommerce' );
			} else {
				$background_color = '#E8ECF0';
				$label_text       = $post_status;
			}
			// Check if coming soon option is enabled
			$coming_soon = get_option( 'nfd_coming_soon' );
			if ( $coming_soon ) {
				$background_color = '#E8ECF0';
			}
			echo '<span style="background-color: ' . esc_attr( $background_color ) . '; ' . esc_attr( $common_style ) . '">' . esc_html( $label_text ) . '</span><br>' . esc_html( __( 'Last Modified', 'wp-module-ecommerce' ) ) . ' : ' . esc_html( mysql2date( 'Y/m/d \a\t g:i a', $post_date ) );
		}
	}

	/**
	 * Add sorting for the status column
	 *
	 * @param array $columns Array of sortable column names for posts/pages
	 */
	public function sortable_columns( $columns ) {
		$columns['status'] = 'status';
		return $columns;
	}

	/**
	 * On login, it checks whether to show the migration steps, post migration to user
	 */
	public function show_store_setup() {
		$site_url         = get_option( 'siteurl', false );
		$webserverUpdated = get_option( 'update_site_server_clicked', false );

		$brand = $this->container->plugin()->id;

		/**
		 * Verifies if the url is matching with the regex
		 *
		 * @param string $brand_name id of the brand
		 *
		 * @param string $site_url siteurl
		 */
		function check_url_match( $brand_name, $site_url ) {
			switch ( $brand_name ) {
				case 'bluehost':
					return ! preg_match( '/\b\w+(\.\w+)*\.mybluehost\.me\b/', $site_url );
				case 'hostgator':
					return ! preg_match( '/\b\w+(\.\w+)*\.temporary\.site\b/', $site_url );
				default:
					return true;
			}
		}
		if ( check_url_match( $brand, $site_url ) ) {
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
}
