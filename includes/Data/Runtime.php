<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\Module\ECommerce\Data\Brands;
use NewfoldLabs\WP\ModuleLoader\Container;

final class Runtime {

	private static function get_brand_name(Container $container) {
		$brand_raw_value  = $container->plugin()->brand;
		return \sanitize_title( str_replace( '_', '-', $brand_raw_value ) );
	}

	/**
	 * Runtime data for ecommerce application
	 */
	public static function prepareData(Container $container) {
		return array(
			'site'           => array( 
				'url' => \get_site_url(),
				'install_token' => PluginInstaller::rest_get_plugin_install_hash(),
			),
			'admin_url'      => \admin_url(),
			'rest_url'       => \get_home_url() . '/index.php',
			'capabilities'   => $container->get('capabilities')->all(),
			'brand_settings' => Brands::get_config( Runtime::get_brand_name( $container ) ),
			'sdk' => array(
				'nonces' => array(
					'gateway_toggle' => \wp_create_nonce( 'woocommerce-toggle-payment-gateway-enabled' )
				)
			)
		);
	}

}
