<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ECommerce\ECommerce;
use NewfoldLabs\WP\Module\ECommerce\Data\Plugins;

use function NewfoldLabs\WP\ModuleLoader\register;

if ( function_exists( 'add_action' ) ) {
	add_action(
		'plugins_loaded',
		function () {
			register(
				array(
					'name'     => 'ecommerce',
					'label'    => __( 'eCommerce', 'wp-module-ecommerce' ),
					'callback' => function ( Container $container ) {
						define( 'NFD_ECOMMERCE_BUILD_DIR', __DIR__ . '/build/' );
						define( 'NFD_ECOMMERCE_PLUGIN_URL', $container->plugin()->url );
						new ECommerce( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				)
			);
		}
	);

}
