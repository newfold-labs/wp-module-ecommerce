<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use Bluehost\AccessToken;
use Bluehost\SiteMeta;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
use function NewfoldLabs\WP\ModuleLoader\container;

class UserController {

	protected $namespace = 'newfold-ecommerce/v1';
	protected $rest_base = '/user';

	public function register_routes() {
		\register_rest_route(
			$this->namespace,
			$this->rest_base . '/profile',
			array(
				'methods'  => \WP_REST_Server::READABLE,
				'permission_callback' => array( Permissions::class,'rest_is_authorized_admin' ),
				'callback' => array ( $this, 'get_profile')
			)
		);
	}

	/**
	 * Connect to UAPI with token via AccessToken Class in Bluehost Plugin
	 * 
	 * @param string $path of desired API endpoint
	 * @return object of response data in json format
	 */
	public static function connect( $namespace, $path ) {
		if ( ! $path ) {
			return;
		}

		AccessToken::maybe_refresh_token();
		
		$token         = AccessToken::get_token();
		$user_id       = AccessToken::get_user();
		$domain        = SiteMeta::get_domain();
		$url           = sprintf( 'https://my.bluehost.com/api/users/%s/%s/%s/%s', $user_id, $namespace, $domain, $path);
		$args          = array( 'headers' => array( 'X-SiteAPI-Token' => $token ) );
		$response      = \wp_remote_get( $url, $args );
		$response_code = \wp_remote_retrieve_response_code( $response );

		if ( is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) != 200 ) {
			return;
		}
		return json_decode( \wp_remote_retrieve_body( $response ) );
	}

	public function get_profile() {
		$response = self::connect('account-center', 'profile?hide_country_list=1');

		if ( ! is_object( $response ) ) {
			return array( 'message' => 'error' );
		}
		return $response;
	}
}