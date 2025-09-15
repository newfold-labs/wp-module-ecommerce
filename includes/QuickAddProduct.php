<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\Solutions\Solutions;
use NewfoldLabs\WP\ModuleLoader\Container;

/**
 * Quick Add Product Class
 */
class QuickAddProduct {

	/**
	 * Holds the container object
	 *
	 * @var Container
	 */
	protected $container;

	/**
	 * Constructor
	 *
	 * @param Container $container Plugin container.
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
	}

	/**
	 * Initialize class hooks/filters
	 *
	 * @return void
	 */
	public function init() {
		// Enable it only for Bluehost brand plugin.
		if ( 'bluehost' !== $this->container->plugin()->id || ! function_exists( 'WC' ) ) {
			return;
		}

		// Enqueue scripts in admin.
		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
		// Register dashboard widget.
		\add_action( 'wp_dashboard_setup', array( $this, 'register_dashboard_widgets' ) );
		// Register API routes.
		\add_action( 'rest_api_init', array( $this, 'register_routes' ) );
		// Output root for modal.
		\add_action( 'admin_footer', array( $this, 'output_modal_root' ) );

		// Handle special product type page.
		\add_action( 'admin_footer', array( $this, 'handle_product_type_on_add_product' ) );
	}


	/**
	 * Enqueue scripts
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		global $current_screen;

		$asset_file = NFD_ECOMMERCE_BUILD_DIR . 'quick-add-product/index.asset.php';
		if ( file_exists( $asset_file ) ) {
			$asset = require $asset_file;

			// Add WC accounting script to the dependencies array.
			$asset['dependencies'][] = 'accounting';

			// Register script.
			wp_register_script(
				'quick-add-product',
				NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/build/quick-add-product/index.js',
				array_merge(
					$asset['dependencies'],
					array( 'newfold-global-ctb', 'nfd-installer-listener', 'nfd-installer' ),
				),
				$asset['version'],
				true
			);

			wp_localize_script(
				'quick-add-product',
				'quickAddProduct',
				array(
					'productTypes'  => $this->get_product_types(),
					'addProductUrl' => add_query_arg( array( 'post_type' => 'product' ), \admin_url( 'post-new.php' ) ),
					'money'         => array(
						'decimals'          => wc_get_price_decimals(),
						'thousandSeparator' => wc_get_price_thousand_separator(),
						'decimalSeparator'  => wc_get_price_decimal_separator(),
						'currencySymbol'    => get_woocommerce_currency_symbol(),
					),
				)
			);

			wp_register_style(
				'quick-add-product',
				NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/build/quick-add-product/quick-add-product.css',
				array( 'newfold-global-ctb-style', 'nfd-installer' ),
				$asset['version']
			);

			// Maybe enqueue scripts.
			if ( ! empty( $current_screen ) && in_array( $current_screen->id, array( 'dashboard', 'edit-product' ), true ) ) {

				wp_enqueue_global_styles_css_custom_properties();
				wp_enqueue_media();

				wp_enqueue_script( 'quick-add-product' );
				wp_enqueue_style( 'quick-add-product' );
			}
		}
	}

	/**
	 * Register dashboard widget
	 *
	 * @return void
	 */
	public function register_dashboard_widgets() {
		wp_add_dashboard_widget(
			'nfd_quick_add_product_widget',
			esc_html__( 'Quick Add Product', 'wp-module-ecommerce' ),
			array( $this, 'output_dashboard_widget' ),
			null,
			null,
			'column3',
			'high'
		);
	}

	/**
	 * Output the dashboard widget
	 *
	 * @return void
	 */
	public function output_dashboard_widget() {
		echo '<div id="nfd-quick-add-product-widget"></div>';
	}

	/**
	 * Register create product API route
	 *
	 * @return void
	 */
	public function register_routes() {
		( new \NewfoldLabs\WP\Module\ECommerce\RestApi\QuickAddProductController() )->register_routes();
	}

	/**
	 * Output modal root
	 *
	 * @return void
	 */
	public function output_modal_root() {
		if ( ! wp_script_is( 'quick-add-product', 'enqueued' ) ) {
			return;
		}

		echo '<div id="nfd-quick-add-product-modal"></div>';
	}

	/**
	 * Return an array of product types.
	 *
	 * @return array
	 */
	protected function get_product_types() {

		// Init types with default.
		$types = array(
			array(
				'key'         => 'virtual',
				'title'       => __( 'Digital products or services', 'wp-module-ecommerce' ),
				'description' => __( 'EX: eBooks, stock photos, software, templates, podcasts, apps, videos, etc. No physical products or shipping management.', 'wp-module-ecommerce' ),
			),
			array(
				'key'         => 'physical',
				'title'       => __( 'Physical products', 'wp-module-ecommerce' ),
				'description' => __( 'Ex: clothing, furniture, accessories — any type of product that needs to be physically shipped to your customers.', 'wp-module-ecommerce' ),
			),
		);

		// Get entitlements.
		if ( ! class_exists( 'NewfoldLabs\WP\Module\Solutions\Solutions' ) ) {
			return $types;
		}

		$entitlements_data = Solutions::get_enhanced_entitlment_data();
		$entitlements      = array_merge(
			isset( $entitlements_data['entitlements'] ) ? $entitlements_data['entitlements'] : array(),
			isset( $entitlements_data['premium'] ) ? $entitlements_data['premium'] : array()
		);

		$premium_types = array(
			'yith-woocommerce-booking-premium/init.php' => array(
				'key'         => 'booking',
				'title'       => __( 'Bookings/Appointments', 'wp-module-ecommerce' ),
				'description' => __( 'Ex: apartment bookings, rental of products, medical appointments, personal training, etc — any type of bookable product or service.', 'wp-module-ecommerce' ),
			),
			'wp-plugin-subscriptions/wp-plugin-subscriptions.php'          => array(
				'key'         => 'subscription',
				'title'       => __( 'Subscription', 'wp-module-ecommerce' ),
				'description' => __( 'Ex: a monthly subscription box, a magazine subscription, streaming service like Netflix, etc - any type of product your customer pays for on a recurring basis.', 'wp-module-ecommerce' ),
			),
		);

		foreach ( $entitlements as $entitlement ) {
			if ( ! is_array( $entitlement ) || ! array_key_exists( $entitlement['basename'], $premium_types ) ) {
				continue;
			}

			$premium_type = $premium_types[ $entitlement['basename'] ];
			// If plugin is active add redirect flag to handle modal type correctly.
			if ( is_plugin_active( $entitlement['basename'] ) ) {
				$premium_type['redirect'] = true;
			} elseif ( $this->can_access_global_ctb() ) { // Can access global CTB, handle it.
				$premium_type['premiumData'] = $entitlement;
			}

			$types[] = $premium_type;
		}

		return $types;
	}

	/**
	 * Can current user access global CTB?
	 */
	protected function can_access_global_ctb(): bool {
		return (bool) $this->container->get( 'capabilities' )->get( 'canAccessGlobalCTB' );
	}

	/**
	 * Handle product type (booking|subscription) for single product add-new page.
	 *
	 * @return void
	 */
	public function handle_product_type_on_add_product() {
		global $pagenow;

		if ( 'post-new.php' !== $pagenow || ! isset( $_GET['post_type'], $_GET['product_type'] )
			|| 'product' !== sanitize_text_field( wp_unslash( $_GET['post_type'] ) )
		) {
			return;
		}

		$product_type = sanitize_text_field( wp_unslash( $_GET['product_type'] ) );

		if ( 'booking' === $product_type ) {
			\wp_print_inline_script_tag( "jQuery(() => jQuery('#product-type').val('booking').change())" );
		} elseif ( 'subscription' === $product_type ) {
			\wp_print_inline_script_tag( "jQuery(() => jQuery('input[name=_bh_subscriptions_subscription]').prop('checked', true).change())" );
		}
	}
}
