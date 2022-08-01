<?php

namespace NewfoldLabs\WP\Module\ECommerce\RestApi;

use Bluehost\AccessToken;
use Bluehost\SiteMeta;

use NewfoldLabs\WP\Module\ECommerce\Permissions;
use function NewfoldLabs\WP\ModuleLoader\container;

class UserController {

	protected $namespace = 'newfold-ecommerce/v1';
	protected $rest_base = '/user';

	public function register_routes() {}

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

		if ( is_wp_error( $response ) ) {
			return array( response => array(), code => 500 );
		}
		return array(
			code     => \wp_remote_retrieve_response_code( $response ),
			response => json_decode( \wp_remote_retrieve_body( $response ) )
		);
	}

	/**
	 * @deprecated 0.1.0
	 *
	 * @return void
	 */
	public function get_profile() {
		$response = self::connect('account-center', 'profile?hide_country_list=1');
		if ( $response['code'] !== 200 ) {
			return new \WP_REST_Response(
				array( status => 'error', message => $response['response'] ),
				$response['code']
			);
		}
		return new \WP_REST_Response( $response['response'], 200 );
	}
}