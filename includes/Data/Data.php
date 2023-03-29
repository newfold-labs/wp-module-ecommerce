<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;
use NewfoldLabs\WP\ModuleLoader\Container;

final class Data {
	/**
	 * Runtime data for ecommerce application
	 */
	public static function runtime(Container $container) {
		return array(
			'adminUrl'          => \admin_url(),
            'pluginId'             => $container->plugin()->id,
		);
	}

} 
