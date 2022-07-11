<?php

namespace NewfoldLabs\WP\Module\ECommerce;

// use WP_Forge\Helpers\Arr;

use NewfoldLabs\WP\Module\Data\HiiveConnection;
use function NewfoldLabs\WP\ModuleLoader\container;

/**
 * Class MarketplaceApi
 */
class ECommerceApi {

    /**
     * Transient name where notifications are stored.
     */
    const TRANSIENT = 'newfold_ecommerce';

    /**
     * Register notification routes.
     */
    public static function registerRoutes() {

        // Add route for fetching marketplace products per brand
        register_rest_route(
            'newfold-ecommerce/v1',
            '/plugins/approved', //complete endpoint is namespace + ..
            array(
                'methods'  => \WP_REST_Server::READABLE, //making endpoint as get request
                'permission_callback' => '__return_true',
                'callback' => function ( \WP_REST_Request $request ){
                    return true;
                }
            )
        );
        register_rest_route(
            'newfold-ecommerce/v1',
            '/plugins/install', //complete endpoint is namespace + ..
            array(
                'methods'  => \WP_REST_Server::READABLE, //making endpoint as get request
                'permission_callback' => '__return_true',
                'callback' => function ( \WP_REST_Request $request ){
                    return true;
                }
            )
        );
    }
}