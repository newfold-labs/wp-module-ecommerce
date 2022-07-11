<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\ModuleLoader\Container;

class ECommerce {

    /**
     * @var
     */
	protected $container;

    /**
     * ECommerce constructor.
     * @param $container
     */
	public function __construct($container) {
	    $this->container = $container;
		// Module functionality goes here
        add_action( 'rest_api_init', array( ECommerceApi::class, 'registerRoutes' ) );
	}
}