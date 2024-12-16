<?php

use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\ECommerce\ECommerce;

use function NewfoldLabs\WP\ModuleLoader\register;

define( 'NFD_ECOMMERCE_MODULE_VERSION', '1.4.6' );

if ( function_exists( 'is_admin' ) && is_admin() ) {
	$old_woocommerce_module_version = get_option( 'nfd_ecommerce_module_version' );

	if ( $old_woocommerce_module_version < NFD_ECOMMERCE_MODULE_VERSION ) {
		update_option( 'nfd_ecommerce_module_version', NFD_ECOMMERCE_MODULE_VERSION, true );
	}
}

/**
 * Skips woocommerce onboarding
 */
function skip_woo_onboarding() {
	$wc_option       = 'woocommerce_onboarding_profile';
	$skip_onboarding = array(
		'skipped' => true,
	);
	$profile         = (array) get_option( $wc_option, array() );
	update_option( $wc_option, array_merge( $profile, $skip_onboarding ) );
}

if ( function_exists( 'register_activation_hook' ) ) {

	register_activation_hook(
		'woocommerce/woocommerce.php',
		function () {
			skip_woo_onboarding();
			$is_redirect_allowed = strpos( $_SERVER['REQUEST_URI'], 'wp-admin/plugins.php' ) !== false;
			update_option( 'nfd_show_dash_after_woo_activation', $is_redirect_allowed );
		}
	);

}

if ( function_exists( 'add_action' ) ) {

	add_action(
		'plugins_loaded',
		function () {
			register(
				array(
					'name'     => 'ecommerce',
					'label'    => __( 'eCommerce', 'wp-module-ecommerce' ),
					'callback' => function ( Container $container ) {
						define( 'NFD_ECOMMERCE_DIR', __DIR__ );
						define( 'NFD_ECOMMERCE_BUILD_DIR', __DIR__ . '/build/' );
						define( 'NFD_ECOMMERCE_PLUGIN_URL', $container->plugin()->url );
						define( 'NFD_ECOMMERCE_PLUGIN_DIRNAME', dirname( $container->plugin()->basename ) );
						new ECommerce( $container );
					},
					'isActive' => true,
					'isHidden' => true,
				)
			);
		}
	);

}

if ( function_exists( 'add_filter' ) ) {

	add_filter(
		'woocommerce_enable_setup_wizard',
		function () {
			return false;
		}
	);

	add_filter(
		'http_request_args',
		function ( $parsed_args, $url ) {

			// Bail early if the request is not to PayPal's v2 checkout API
			if ( false === stripos( wp_parse_url( $url, PHP_URL_HOST ), 'paypal.com' ) ) {
				return $parsed_args;
			}

			// Check for an existing bn_code
			$bn_code = isset( $parsed_args['headers']['PayPal-Partner-Attribution-Id'] ) ? $parsed_args['headers']['PayPal-Partner-Attribution-Id'] : null;

			// Ensure we only set when blank, or when using one of our stale codes
			if ( is_null( $bn_code ) || false !== stripos( $bn_code, 'yith' ) || false !== stripos( $bn_code, 'newfold' ) ) {
				// The correct code is case-sensitive. YITH brand is uppercase, but the code is not.
				$parsed_args['headers']['PayPal-Partner-Attribution-Id'] = 'Yith_PCP';
			}

			return $parsed_args;
		},
		10,
		2
	);

	add_filter(
		'script_loader_tag',
		function ( $tag, $handle, $source ) {
			if ( stripos( $source, 'paypal.com/sdk' ) !== false ) {
				$replacement = ' data-partner-attribution-id="Yith_PCP"';
				if ( stripos( $tag, 'partner-attribution-id' ) === false ) {
					$tag = str_replace( ' src=', $replacement . ' src=', $tag );
				} elseif ( stripos( $tag, 'NEWFOLD' ) || stripos( $tag, 'YITH' ) ) {
					$tag = preg_replace( '/ data-partner-attribution-id="(.*?)"/', $replacement, $tag );
				}
			}
			return $tag;
		},
		25,
		3
	);

	add_filter(
		'yith_wcbk_is_request',
		function ( $is_request, $type ) {
			return 'rest' === $type ? wp_is_json_request() : $is_request;
		},
		10,
		2
	);
}
