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
            '/' .  $this->rest_base,
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
     * Additional fields for product.
     *
     * @since 4.7.0
     *
     * @global array $wp_rest_additional_fields Holds registered fields, organized by object type.
     *
     * @param string $object_type Optional. The object type.
     * @return array Registered additional fields (if any), empty array if none or if the object type
     *               could not be inferred.
     */
    protected function get_additional_fields( $object_type = null ) {
        $additional_fields = parent::get_additional_fields( $object_type );

        $additional_fields['featured_image'] = array(
            'description' => __( 'Product featured image.', 'wp-module-ecommerce' ),
            'type'        => 'integer',
            'context'     => array( 'view', 'edit' ),
            'readonly'    => true,
        );

        return $additional_fields;
    }

    /**
     * Prepare a single product for create or update.
     *
     * @param \WP_REST_Request $request Request object.
     * @param bool            $creating If is creating a new object.
     *
     * @return \WP_Error|\WC_Data
     */
    protected function prepare_object_for_database( $request, $creating = false ) {
        /**
         * @var \WC_Product $product
         */
        $product = parent::prepare_object_for_database( $request, $creating );

        if ( ! is_wp_error( $product ) && isset( $request['featured_image'] ) ) {
            $product = $this->set_product_featured_image( $product, absint( $request['featured_image'] ) );
        }

        return $product;
    }

    /**
     * Core function to prepare a single product output for response
     * (doesn't fire hooks, ensure_response, or add links).
     *
     * @param \WC_Data         $object_data Object data.
     * @param \WP_REST_Request $request Request object.
     * @param string          $context Request context.
     * @return array Product data to be included in the response.
     */
    protected function prepare_object_for_response_core( $object_data, $request, $context ): array {
        $data = parent::prepare_object_for_response_core( $object_data, $request, $context );

        $data['edit_url'] = get_edit_post_link( $object_data->get_id() );

        return $data;
    }

    /**
     * Set product featured image.
     *
     * @param \WC_Product $product  Product instance.
     * @param int         $image_id Featured product image ID.
     *
     * @throws \WC_REST_Exception REST API exceptions.
     * @return \WC_Product
     */
    protected function set_product_featured_image( $product, $image_id ) {

        if ( $image_id ) {
            // Validate attachment image.
            if ( ! wp_attachment_is_image( $image_id ) ) {
                /* translators: %s: attachment id */
                throw new \WC_REST_Exception( 'woocommerce_product_invalid_image_id', sprintf( __( '#%s is an invalid image ID.', 'wp-module-ecommerce' ), $image_id ), 400 );
            }

            $product->set_image_id( $image_id );
        }

        return $product;
    }
}
