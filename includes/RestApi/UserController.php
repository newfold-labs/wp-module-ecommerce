<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Onboarding\Data\Data;
use NewfoldLabs\WP\Module\ECommerce\Data\Brands;

class UserController {

	protected $container;
	protected $namespace = 'newfold-ecommerce/v1';
	protected $rest_base = '/user';

	public function __construct( Container $container ) {
		$this->container = $container;
	}

	/**
	 * To get the status of WordPress Pages
	 */
	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/page-status',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'get_page_status' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	/**
	 * @return array
	 */
	public function get_page_status() {
		$args  = array(
			'post_status' => array( 'pending', 'draft', 'future', 'publish', 'private' ),
			'post_type'   => 'page',
			'meta_key'    => 'nf_dc_page',
			'meta_value'  => array( 'home', 'about', 'contact' ),
		);
		$pages = \get_pages( $args );
		$theme = \wp_get_theme();
		$brand_raw_value  = $this->container->plugin()->brand;
		$brand = \sanitize_title_with_dashes( strtolower( str_replace( '_', '-', $brand_raw_value ) ) );
		$customer = array(
			'plan_subtype' => 'unknown'
		);
		$brands = Brands::get_brands();
		$currentBrandConfig = $brands[$brand];
		if (class_exists('NewfoldLabs\WP\Module\Onboarding\Data\Data')) {
			$customer_from_options = Data::customer_data();
			if ($customer_from_options != false) {
				$customer = $customer_from_options;
			}
		}
		return array(
			'site' => array (
				'url' => \get_site_url()
			),
			'details' => $customer,
			'currentBrandConfig' => $currentBrandConfig,
			'theme' => array(
				'manage'   => Permissions::rest_can_manage_themes(),
				'template' => $theme->get_template(),
				'name'     => $theme->get( 'Name' ),
			),
			'pages' => $pages,
		);
	}
}
