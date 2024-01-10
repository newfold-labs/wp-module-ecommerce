<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Data\Plugins;
use NewfoldLabs\WP\Module\ECommerce\Permissions;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\ModuleLoader\Container;

class IntegrationsController {

	protected $namespace = 'newfold-ecommerce/v1';

	protected $rest_base = '/integrations';

	protected $container;

	public function __construct( Container $container ) {
		$this->container = $container;
	}

	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/paypal',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_paypal_status' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/shippo',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_shippo_status' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/stripe',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_stripe_status' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/razorpay',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_razorpay_status' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	private function get_plugin_details( $plugin ) {
		return array(
			'url'    => \admin_url( Plugins::$supported_plugins[ $plugin ][ 'url' ] ),
			'status' => PluginInstaller::exists( $plugin, true ),
			'slug'   => $plugin
		);
	}

	public function get_paypal_status() {
		$details = null;
		$integration = array(
			'captive' => \admin_url( 'admin.php?page=nfd-ecommerce-captive-flow-paypal' ),
			'plugin' => $this->get_plugin_details( 'nfd_slug_yith_paypal_payments_for_woocommerce' ),
		);
		$is_captive_flow_complete = \get_option( 'nfd-ecommerce-captive-flow-paypal', 'false' );
		if ($is_captive_flow_complete === 'true') {
			$ppwc_options = \get_option( 'yith_ppwc_gateway_options', array() );
			if (isset( $ppwc_options['enabled'] ) ) {
				$ppwc_email = \get_option( 'yith_ppwc_merchant_email', '' );
				$details = array(
					'environment' => $ppwc_options['environment'] === 'production' ? 'live' : 'sandbox' ,
					'email' => $ppwc_email
				);
			}
		}
		return new \WP_REST_Response(
			array(
				'complete'    => $is_captive_flow_complete === 'true', 
				'details'     => $details,
				'integration' => $integration,
			),
			200
		);
	}
	public function get_shippo_status() {
		$details = null;
		$integration = array(
			'captive' => \admin_url( 'admin.php?page=nfd-ecommerce-captive-flow-shippo' ),
			'plugin' => $this->get_plugin_details( 'nfd_slug_yith_shippo_shippings_for_woocommerce' ),
		);
		$is_captive_flow_complete = \get_option( 'nfd-ecommerce-captive-flow-shippo', 'false' );
		if ($is_captive_flow_complete === 'true') {
			$shippo_environment = \get_option( 'yith_shippo_environment', '' );
			$details = array(
				'environment' => $shippo_environment,
			);
		}
		return new \WP_REST_Response(
			array(
				'complete'    => $is_captive_flow_complete === 'true', 
				'details'     => $details,
				'integration' => $integration,
			),
			200
		);
	}
	
	public function get_razorpay_status() {
		$integration = array(
			'captive' => null,
			'plugin' => $this->get_plugin_details( 'nfd_slug_woo_razorpay' ),
		);
		$is_captive_flow_complete = \get_option( 'nfd-ecommerce-captive-flow-razorpay', 'false' );
		$razorpay_settings = \get_option( 'woocommerce_razorpay_settings', null );
		$details = array (
			'settings' => $razorpay_settings
		);
		if ($is_captive_flow_complete === 'true') {
			$environment = '';
			if ( $razorpay_settings !== null && isset( $razorpay_settings['key_id'] ) ) {
				$environment = str_starts_with( $razorpay_settings['key_id'], 'rzp_test_' ) ? 'sandbox' : 'live';
			}
			$details['environment'] = $environment;
		}
		return new \WP_REST_Response(
			array(
				'complete'    => $is_captive_flow_complete === 'true', 
				'details'     => $details,
				'integration' => $integration,
			),
			200
		);
	}

	public function get_stripe_status() {
		$integration = array(
			'captive' => null,
			'plugin' => $this->get_plugin_details( 'nfd_slug_yith_stripe_payments_for_woocommerce' ),
		);
		$is_captive_flow_complete = \get_option( 'nfd-ecommerce-captive-flow-stripe', 'false' ); 
		$stripewc_options = \get_option( 'yith_stripe_payments_enabled', array() );
		$details = array();
		if ( $is_captive_flow_complete === 'true' ) {
			$stripewc_email = \get_option( 'yith_stripe_payments_email', '' );
			$details = array(
				'environment' => \get_option( 'yith_stripe_payments_environment', 'live' ) === 'live' ? 'live' : 'sandbox' ,
				'email' => $stripewc_email
			);
		}

		return new \WP_REST_Response(
			array(
				'complete'    => $is_captive_flow_complete === 'true',
				'details'     => $details,
				'integration' => $integration,
			),
			200
		);
	}
}
