<?php

namespace NewfoldLabs\WP\Module\ECommerce;

/**
 * Permissions and Authorization constants and utilities.
 */
final class Permissions {

	/**
	 * WordPress Admin capability string
	 */
	const ADMIN = 'manage_options';

	/**
	 * Confirm REST API caller has ADMIN user capabilities.
	 *
	 * @return boolean
	 */
	public static function rest_is_authorized_admin() {
		return \is_user_logged_in() && \current_user_can( self::ADMIN );
	}
}
