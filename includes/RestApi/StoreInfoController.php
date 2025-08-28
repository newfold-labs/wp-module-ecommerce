<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Permissions;

/**
 * Store info Rest API controller.
 */
class StoreInfoController extends \WC_REST_Data_Controller {

	/**
	 * The namespace of this controller's route.
	 *
	 * @var string
	 */
	protected $namespace = 'newfold-ecommerce/v1';

	/**
	 * The base of this controller's route.
	 *
	 * @var string
	 */
	protected $rest_base = 'store-info';

	/**
	 * Register the routes
	 */
	public function register_routes() {

		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base,
			array(
				array(
					'methods'             => \WP_REST_Server::CREATABLE,
					'callback'            => array( $this, 'store_options' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_shop_manager' ),
				),
				'schema' => array( $this, 'get_item_schema' ),
			)
		);
	}

	/**
	 * Get the Store Info API schema, conforming to JSON Schema.
	 *
	 * @return array
	 */
	public function get_item_schema() {
		return array(
			'$schema'    => 'http://json-schema.org/draft-04/schema#',
			'title'      => 'store-info',
			'type'       => 'object',
			'properties' => array(
				'address'  => array(
					'description' => __( 'Store address info', 'wp-module-ecommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
				),
				'city'     => array(
					'description' => __( 'Store city info.', 'wp-module-ecommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
				),
				'postcode' => array(
					'description' => __( 'Store postcode info.', 'wp-module-ecommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
				),
				'state'    => array(
					'description' => __( 'Store state info.', 'wp-module-ecommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
				),
				'country'  => array(
					'description' => __( 'Store country info.', 'wp-module-ecommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
				),
				'industry' => array(
					'description' => __( 'Store industry info.', 'wp-module-ecommerce' ),
					'type'        => 'string',
					'context'     => array( 'view', 'edit' ),
				),
			),
		);
	}

	/**
	 * Save store options
	 *
	 * @param \WP_REST_Request $request The request.
	 */
	public function store_options( $request ) {
		$updated = array();
		$params  = $request->get_json_params();

		// Handle special country option.
		if ( isset( $params['country'] ) ) {
			$value  = $params['country'];
			$states = WC()->countries->get_states( $value );

			if ( $states && isset( $params['state'] ) ) {
				$value .= ':' . $params['state'];
			}

			$updated['country'] = update_option( 'woocommerce_default_country', $value );
		}

		// Handle option industry.
		if ( isset( $params['industry'] ) ) {
			$updated['industry'] = update_option( 'nfd_store_industry', $params['industry'] );
		}

		foreach ( array( 'address', 'city', 'postcode' ) as $key ) {
			if ( ! isset( $params[ $key ] ) ) {
				continue;
			}

			$updated[ $key ] = update_option( "woocommerce_store_{$key}", $params[ $key ] );
		}

		return $updated;
	}
}
