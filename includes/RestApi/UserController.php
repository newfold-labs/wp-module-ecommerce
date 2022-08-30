<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
use function NewfoldLabs\WP\ModuleLoader\container;

class UserController {

	protected $namespace = 'newfold-ecommerce/v1';
	protected $rest_base = '/user';

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

	public function get_page_status() {
		$args  = array(
			'post_status' => array( 'pending', 'draft', 'future', 'publish', 'private' ),
			'post_type'   => 'page',
			'meta_key'    => 'nf_dc_page',
			'meta_value'  => array( 'home', 'about', 'contact' ),
		);
		$pages = \get_pages( $args );
		$theme = \wp_get_theme();
		return array(
			'theme' => array(
				'manage'   => Permissions::rest_can_manage_themes(),
				'template' => $theme->get_template(),
				'name'     => $theme->get( 'Name' ),
			),
			'pages' => $pages,
		);
	}
}
