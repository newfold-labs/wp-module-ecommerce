<?php
namespace NewfoldLabs\WP\Module\ECommerce\Partials;

use NewfoldLabs\WP\ModuleLoader\Container;
/**
 * Class WooCommerceBacklink
 *
 * @package NewfoldLabs\WP\Module\ECommerce\Partials
 */
class WooCommerceBacklink {

	/**
	 * Container for managing application dependencies.
	 *
	 * @var mixed $container This variable holds the container instance.
	 */
	public static $container;
	/**
	 * Hook suffixes to attach Back button
	 *
	 * @var array
	 */
	public static $hook_suffixes = array(
		'post.php',
		'post-new.php',
		'edit-tags.php',
		'woocommerce_page_wc-admin',
		'woocommerce_page_wc-settings',
		'product_page_product_importer',
	);

	/**
	 * Initialize the CaptiveFlow functionality.
	 *
	 * Sets up the container and hooks for adding back links.
	 *
	 * @param Container $container The container instance to be used.
	 * @return void
	 */
	public static function init( Container $container ) {
		self::$container = $container;
		foreach ( self::$hook_suffixes as $hook_suffix ) {
			add_action( 'load-' . $hook_suffix, array( __CLASS__, 'add_back_link' ), 100 );
		}
	}

	/**
	 * Adds back link functionality to WooCommerce admin pages.
	 *
	 * This function enqueues necessary JavaScript and CSS files for adding a back link,
	 *
	 * @return void
	 */
	public static function add_back_link() {
		$runtime = array( 'pluginId' => self::$container->plugin()->id );
		\wp_enqueue_script( 'nfd-ecommerce-woocommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/woocommerce.js', array(), '1', true );
		\wp_enqueue_style( 'nfd-ecommerce-woocommerce-captive', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Partials/woocommerce.css', null, '1', 'screen' );
		\wp_add_inline_script(
			'nfd-ecommerce-woocommerce-captive',
			'nfdEcommerce =' . wp_json_encode( $runtime ) . ';',
			'before'
		);
	}
}
