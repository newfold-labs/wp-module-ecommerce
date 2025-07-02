<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Permissions;

/**
 * Quick Add Product Rest API controller.
 */
class QuickAddProductController extends \WC_REST_Products_Controller {

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
	protected $rest_base = 'product';

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
					'callback'            => array( $this, 'create_item' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_shop_manager' ),
					'args'                => $this->get_endpoint_args_for_item_schema(),
				),
				'schema' => array( $this, 'get_public_item_schema' ),
			)
		);
	}

	/**
	 * Core function to prepare a single product output for response
	 * (doesn't fire hooks, ensure_response, or add links).
	 *
	 * @param \WC_Data         $object_data Object data.
	 * @param \WP_REST_Request $request Request object.
	 * @param string           $context Request context.
	 * @return array Product data to be included in the response.
	 */
	protected function prepare_object_for_response_core( $object_data, $request, $context ): array {
		$data = parent::prepare_object_for_response_core( $object_data, $request, $context );

		$data['edit_url'] = get_edit_post_link( $object_data->get_id(), 'view' );

		return $data;
	}

	/**
	 * Save taxonomy terms.
	 *
	 * @param \WC_Product $product  Product instance.
	 * @param array       $terms    Terms data.
	 * @param string      $taxonomy Taxonomy name.
	 *
	 * @return \WC_Product
	 */
	protected function save_taxonomy_terms( $product, $terms, $taxonomy = 'cat' ) {

		// Go with default behaviour for tags.
		if ( 'cat' !== $taxonomy ) {
			return parent::save_taxonomy_terms( $product, $terms, $taxonomy );
		}

		$term_ids = array();

		foreach ( $terms as $term ) {

			// If term ID is zero, create term. Otherwise, collect.
			if ( empty( $term['id'] ) ) {
				$new_term = wp_insert_term( $term['name'], 'product_cat' );
				if ( ! is_wp_error( $new_term ) ) {
					$term_ids[] = $new_term['term_id'];
				}
			} else {
				$term_ids[] = $term['id'];
			}

			$product->set_category_ids( $term_ids );
		}

		return $product;
	}
}
