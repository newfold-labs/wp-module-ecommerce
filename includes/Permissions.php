<?php
namespace NewfoldLabs\WP\Module\ECommerce;

/**
 * Permissions and Authorization constants and utilities.
 */
final class Permissions {

	/**
	 * WordPress Admin capability string
	 */
	const ADMIN          = 'manage_options';
	const INSTALL_THEMES = 'install_themes';
	const EDIT_THEMES    = 'edit_themes';

	public static function rest_get_plugin_install_hash() {
		return array(
			'hash' => 'NFD_ONBOARDING_' . hash( 'sha256', NFD_ONBOARDING_VERSION . wp_salt( 'nonce' ) . site_url() ),
		);
	}

	/**
	 * Confirm REST API caller has ADMIN user capabilities.
	 *
	 * @return boolean
	 */
	public static function rest_is_authorized_admin() {
		return \is_user_logged_in() && \current_user_can( Permissions::ADMIN );
	}

	/**
	 * Confirm logged-in user is in wp-admin and has ADMIN user capabilities.
	 *
	 * @return boolean
	 */
	public static function is_authorized_admin() {
		return \is_admin() && self::rest_is_authorized_admin();
	}

	public static function rest_can_manage_themes() {
		return \is_user_logged_in() &&
			\current_user_can( Permissions::INSTALL_THEMES ) &&
			\current_user_can( Permissions::EDIT_THEMES );
	}

}
