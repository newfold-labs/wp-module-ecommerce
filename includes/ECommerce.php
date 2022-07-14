<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ECommerce\RestApi\PluginsController;

class ECommerce {

	/**
	 * @var Container
	 */
	protected $container;

    protected $controllers = array(
        'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\PluginsController',
    );

	/**
	 * ECommerce constructor.
	 * @param $container
	 */
	public function __construct(Container $container) {
		$this->container = $container;
		// Module functionality goes here
		add_action( 'admin_bar_menu', array( $this, 'newfold_site_status' ), 200 );
		add_action( 'rest_api_init', array( ECommerceApi::class, 'registerRoutes' ) );
        add_action( 'rest_api_init', array( $this, 'register_routes' ));
        add_action( 'admin_menu', array( __CLASS__, 'register_page' ) );
	}

    public static function register_page() {
        \add_submenu_page(
            null,
            null,
            null,
            Permissions::ADMIN,
            'nfd-ecommerce',
            array( __CLASS__, 'render' ),
            100
        );
    }

    public static function render() {
        echo PHP_EOL;
        echo '<!-- NFD:ECOMMERCE -->';
        echo PHP_EOL;
        echo '<div id="nfd-ecommerce" class="nfd-ecommerce-container" style="background-color:Red"><p>Text</p></div>';
        echo PHP_EOL;
        echo '<!-- /NFD:ECOMMERCE -->';
        echo PHP_EOL;
    }

    public function register_routes() {
        foreach ( $this->controllers as $controller ) {
            /**
             * Get an instance of the WP_REST_Controller.
             *
             * @var $instance WP_REST_Controller
             */
            $instance = new $controller();
            $instance->register_routes();
        }
    }
	
	/**
	 * Customize the admin bar with site status.
	 *
	 * @param WP_Admin_Bar $admin_bar An instance of the WP_Admin_Bar class.
	 */
	public function newfold_site_status( \WP_Admin_Bar $admin_bar ) {
		if ( current_user_can( 'manage_options' ) ) {
			$is_coming_soon = 'true' === get_option( 'mm_coming_soon', 'false' );
			$status = $is_coming_soon
			? '<span id="nfd-site-status-text" style="color:#E01C1C;">' . esc_html__( 'Coming Soon', 'wp-module-ecommerce' ) . '<span>'
			: '<span id="nfd-site-status-text" style="color:#048200;">' . esc_html__( 'Live', 'wp-module-ecommerce' ) . '<span>';
			$site_status_menu = array(
				'id'    => 'site-status',
				'parent' => 'top-secondary',
				'href'  => admin_url( 'admin.php?page=bluehost#/home' ),
				'title' => '<div style="background-color: #F8F8F8; padding: 0 16px;color:#333333;">' . esc_html__( 'Site Status: ', 'wp-module-ecommerce' ) . $status . '</div>',
				'meta'  => array(
					'title' => esc_attr__( 'Launch Your Site', 'wp-module-ecommerce' ),
				),
			);
			$admin_bar->add_menu( $site_status_menu );
			$admin_bar->remove_menu ( 'mojo-home' ); // Remove status added by bwp
		}
	}
}