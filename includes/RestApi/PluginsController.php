<?php
namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
use NewfoldLabs\WP\Module\ECommerce\Data\Plugins;

/**
 * Class PluginsController
 */
class PluginsController {

	/**
	 * @var string
	 */
	protected $namespace = 'newfold-ecommerce/v1';

	/**
	 * @var string
	 */
	protected $rest_base = '/plugins';

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
	 * Get approved plugin slugs, urls, domains and queue status.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_plugins_status() {
		$plugins = array(
			'woocommerce',
			'yith_wcmap_panel',
			'yith_woocommerce_gift_cards_panel',
			'yith_wcwl_panel',
			'yith_wcan_panel',
			'yith_wcbk_panel',
			'yith_wcas_panel',
			'yith_paypal_payments',
			'yith_shippo_shipping_for_woocommerce',
		);
		foreach ( $plugins as $plugin ) {
			$map = Plugins::get_slug_map( $plugin );
			if ( file_exists( WP_PLUGIN_DIR . '/' . $map[1] ) ) {
				$active = is_plugin_active( $map[1] );
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
				'token'  => Permissions::rest_get_plugin_install_hash(),
			),
			200
		);
	}
}
