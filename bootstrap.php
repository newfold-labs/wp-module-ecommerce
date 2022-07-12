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
	 			[
	 				'name'     => 'ecommerce',
	 				'label'    => __( 'eCommerce', 'wp-module-ecommerce' ),
	 				'callback' => function (Container $container) {
	 					new ECommerce($container);
	 				},
	 				'isActive' => true,
	 				'isHidden' => true,
	 			]
	 		);
	 	}
	 );

}