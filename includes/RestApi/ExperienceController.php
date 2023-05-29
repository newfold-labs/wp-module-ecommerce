<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ECommerce\Data\Brands;

class ExperienceController {

	protected $container;
	protected $namespace = 'newfold-ecommerce/v1';
	protected $rest_base = '/experience';

	public function __construct( Container $container ) {
		$this->container = $container;
	}

	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/bootstrap',
			array(
				array(
					'methods'             => \WP_REST_Server::READABLE,
					'callback'            => array( $this, 'fetch_bootstrap_info' ),
					'permission_callback' => array( Permissions::class, 'rest_is_authorized_admin' ),
				),
			)
		);
	}

	private function get_brand_name() {
		$brand_raw_value  = $this->container->plugin()->brand;
		return \sanitize_title( str_replace( '_', '-', $brand_raw_value ) );
	}

	public function get_nfd_pages() {
		$args  = array(
			'post_status' => array( 'pending', 'draft', 'future', 'publish', 'private' ),
			'post_type'   => 'page',
			'meta_key'    => 'nf_dc_page',
			'meta_value'  => array( 'home', 'about', 'contact' ),
		);
		return \get_pages( $args );
	}

	public function get_theme_info() {
		$theme = \wp_get_theme();
		return array(
			'manage'   => Permissions::rest_can_manage_themes(),
			'template' => $theme->get_template(),
			'name'     => $theme->parent() ? trim( $theme->parent()->get('Name') ) : $theme->get( 'Name' ),
		);
	}

	public function fetch_bootstrap_info() {
		return array(
			'currentBrandConfig' => Brands::get_config( $this->get_brand_name() ),
			'theme' => $this->get_theme_info(),
		);
	}
}
