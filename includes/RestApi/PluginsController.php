<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\Installer\Permissions as InstallerPermissions;
use NewfoldLabs\WP\Module\ECommerce\Permissions;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ECommerce\Data\Plugins;

/**
 * Class PluginsController
 */
class PluginsController {

	/**
	 * REST namespace
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-ecommerce/v1';

	/**
	 * REST base
	 *
	 * @var string
	 */
	protected $rest_base = '/plugins';

	/**
	 * Container loaded from the brand plugin.
	 * 
	 * @var Container
	 */
	protected $container;

	public function __construct( Container $container ) {
		$this->container = $container;
	}

	/**
	 * Registers rest routes for PluginsController class.
	 *
	 * @return void
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/status',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_plugins_status' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Get status of supported plugins.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_plugins_status() {
		foreach ( Plugins::supported_plugins() as $plugin => $file ) {
			if ( file_exists( WP_PLUGIN_DIR . '/' . $file ) ) {
				$active = \is_plugin_active( $file );
				if ( $active ) {
					$status[ $plugin ] = 'Active';
				} else {
					$status[ $plugin ] = 'Inactive';
				}
			} else {
				$status[ $plugin ] = 'Not Installed';
			}
		}
		$status['queue-status'] = \get_option( 'nfd_module_onboarding_plugin_install_queue', array() );

		return new \WP_REST_Response(
			array(
				'status' => $status,
				'token'  => array(
					'hash' => InstallerPermissions::rest_get_plugin_install_hash()
				),
			),
			200
		);
	}
}
