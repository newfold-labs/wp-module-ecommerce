<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\ModuleLoader\Container;

/**
 * Store Info Class
 */
class StoreInfo {

	/**
	 * Holds the container object
	 *
	 * @var Container
	 */
	protected $container;

	/**
	 * Constructor
	 *
	 * @param  Container $container  Plugin container.
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
		if ( 'bluehost' !== $this->container->plugin()->id ) {
			return;
		}

		\add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ), 25 );
		\add_action( 'admin_footer', array( $this, 'output_root' ) );
		// Register API routes.
		\add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Enqueue scripts
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		global $current_screen;

		$asset_file = NFD_ECOMMERCE_BUILD_DIR . 'store-info/index.asset.php';
		if ( file_exists( $asset_file ) ) {
			$asset = require $asset_file;

			// Register script.
			wp_register_script(
				'store-info',
				NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/build/store-info/index.js',
				$asset['dependencies'],
				$asset['version'],
				true
			);

			wp_localize_script(
				'store-info',
				'NFDStoreInfo',
				array(
					'data'           => $this->get_store_info(),
					'countryOptions' => $this->get_countries(),
					'stateOptions'   => $this->get_states(),
					'industries'     => $this->get_store_industries(),
				)
			);

			wp_register_style(
				'store-info-style',
				NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/build/store-info/store-info.css',
				array(),
				$asset['version']
			);

			if ( isset( $_GET['page'] ) && 'bluehost' === sanitize_text_field( wp_unslash( $_GET['page'] ) ) ) {

				wp_enqueue_global_styles_css_custom_properties();
				wp_enqueue_media();

				wp_enqueue_script( 'store-info' );
				wp_enqueue_style( 'store-info-style' );
			}
		}
	}

	/**
	 * Output root elem
	 *
	 * @return void
	 */
	public function output_root() {
		echo '<div id="nfd-store-info-modal-wrapper"></div>';
	}

	/**
	 * Get current store info
	 *
	 * @return array
	 */
	protected function get_store_info() {
		if ( ! function_exists( 'WC' ) ) {
			return array();
		}

		return array_merge(
			array(
				'address'  => \get_option( 'woocommerce_store_address', '' ),
				'city'     => \get_option( 'woocommerce_store_city', '' ),
				'postcode' => \get_option( 'woocommerce_store_postcode', '' ),
				'industry' => \get_option( 'nfd_store_industry', '' ),
			),
			wc_get_base_location()
		);
	}

	/**
	 * Get countries array
	 *
	 * @return array
	 */
	protected function get_countries() {
		if ( ! function_exists( 'WC' ) ) {
			return array();
		}

		return $this->format_localized_array( WC()->countries->get_countries() );
	}

	/**
	 * Get states array
	 *
	 * @return array
	 */
	protected function get_states() {
		if ( ! function_exists( 'WC' ) ) {
			return array();
		}

		$states = array_filter( wc()->countries->get_states() );
		return array_map( array( $this, 'format_localized_array' ), $states );
	}

	/**
	 * Return an array of store industries
	 *
	 * @return array
	 */
	protected function get_store_industries() {
		return $this->format_localized_array(
			array(
				'fashion-apparel-accessories'     => __( 'Fashion, apparel, and accessories', 'wp-module-ecommerce' ),
				'health-beauty'                   => __( 'Health and beauty', 'wp-module-ecommerce' ),
				'electronics-computers'           => __( 'Electronics and computers', 'wp-module-ecommerce' ),
				'food-drink'                      => __( 'Food and drink', 'wp-module-ecommerce' ),
				'home-furniture-garden'           => __( 'Home, furniture, and garden', 'wp-module-ecommerce' ),
				'cbd-other-hemp-derived-products' => __( 'CBD and other hemp-derived products', 'wp-module-ecommerce' ),
				'education-and-learning'          => __( 'Education and learning', 'wp-module-ecommerce' ),
				'sports-and-recreation'           => __( 'Sports and recreation', 'wp-module-ecommerce' ),
				'arts-and-crafts'                 => __( 'Arts and crafts', 'wp-module-ecommerce' ),
				'other'                           => __( 'Other', 'wp-module-ecommerce' ),
			)
		);
	}

	/**
	 * Format data for localized script
	 *
	 * @param array $data The data array.
	 * @return array
	 */
	protected function format_localized_array( $data ) {
		$formatted = array();

		array_walk(
			$data,
			function ( &$value, $key ) use ( &$formatted ) {
				$formatted[] = array(
					'value' => $key,
					'label' => $value,
				);
			}
		);

		return $formatted;
	}

	/**
	 * Register create product API route
	 *
	 * @return void
	 */
	public function register_routes() {
		( new \NewfoldLabs\WP\Module\ECommerce\RestApi\StoreInfoController() )->register_routes();
	}
}
