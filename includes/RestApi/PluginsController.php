<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\Installer\Data\Options as InstallerOptions;
use NewfoldLabs\WP\Module\Installer\TaskManagers\PluginInstallTaskManager;
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

	private function get_plugin_queue() {
		$queue_name = PluginInstallTaskManager::get_queue_name();
		return \get_option( InstallerOptions::get_option_name( $queue_name ), array());
	}

	/**
	 * Get status of supported plugins.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_plugins_status( \WP_REST_Request $request) {
		$pluginFilter = $request->get_param('plugins');
		$requestedPlugins = array( );
		if ( isset( $pluginFilter ) ) {
			$requestedPlugins = explode(',', $pluginFilter);
		}
		$details = array();
		foreach ( Plugins::supported_plugins() as $plugin => $info ) {
			if ( !in_array($plugin, $requestedPlugins) && !in_array('all', $requestedPlugins) ) {
				continue;
			}
			$status = 'need_to_install';
			if (
				(isset($info['file_extended']) && file_exists(WP_PLUGIN_DIR . '/' . $info['file_extended'])) ||
				(isset($info['file_premium']) && file_exists(WP_PLUGIN_DIR . '/' . $info['file_premium'])) ||
				file_exists(WP_PLUGIN_DIR . '/' . $info['file'])
			){
				$active = (
					(isset($info['file_extended']) && \is_plugin_active($info['file_extended'])) ||
					(isset($info['file_premium']) && \is_plugin_active($info['file_premium'])) ||
					\is_plugin_active($info['file'])
				);
				if ( $active ) {
					$status = 'active';
				} else {
					$status = 'need_to_activate';
				}
			}
			$details[ $plugin ] = array(
				'status' => $status,
				'url'    => \admin_url( $info['url'] ),
			);
		}
		$plugins_queue = array_column( $this->get_plugin_queue(), 'slug' );
		$plugin_being_installed = \get_option( InstallerOptions::get_option_name( 'plugins_init_status' ), false);
		$plugin_being_installed_queue = \get_option( InstallerOptions::get_option_name( 'plugin_install_queue' ), array());
    if ($plugin_being_installed !== false && $plugin_being_installed !== 'completed') {
      $plugins_queue[] = $plugin_being_installed_queue;
		}
		return new \WP_REST_Response(
			array(
				'details' => $details,
				'queue'   => $plugins_queue,
			),
			200
		);
	}
}
