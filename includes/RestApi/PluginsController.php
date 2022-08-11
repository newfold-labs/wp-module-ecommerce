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
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/verification',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'rest_get_plugin_install_hash' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * Get approved plugin slugs, urls and domains.
	 *
	 * @return \WP_REST_Response
	 */
	public function get_plugins_status() {
		$plugins = array(
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
					$result[ $plugin ] = 'Active';
				} else {
					$result[ $plugin ] = 'Inactive';
				}
			} else {
				$result[ $plugin ] = 'Not Installed';
			}
		}
		return new \WP_REST_Response(
			$result,
			200
		);

	}

	/**
	 * Verify caller has permissions to install plugins.
	 *
	 * @param \WP_REST_Request $request
	 *
	 * @return boolean
	 */
	public function check_install_permissions( \WP_REST_Request $request ) {
		$install_hash = $request->get_header( 'X-NFD-ONBOARDING' );
		return Permissions::rest_verify_plugin_install_hash( $install_hash )
			&& Permissions::rest_is_authorized_admin();
	}
	
	public function rest_get_plugin_install_hash() {
		return array(
			'hash' => 'NFD_ONBOARDING_' . hash( 'sha256', NFD_ONBOARDING_VERSION . wp_salt( 'nonce' ) . site_url() )
		);
	}
}
