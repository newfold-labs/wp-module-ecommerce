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
	 * WooCommerce Shop Manager capability string
	 */
	const SHOP_MANAGER = 'manage_woocommerce';

	/**
	 * Confirm REST API caller has ADMIN user capabilities.
	 *
	 * @return boolean
	 */
	public static function rest_is_authorized_admin() {
		return \is_user_logged_in() && \current_user_can( self::ADMIN );
	}

	/**
	 * Confirm REST API caller has ADMIN user capabilities.
	 *
	 * @return boolean
	 */
	public static function rest_is_authorized_shop_manager() {
		return \is_user_logged_in() && \current_user_can( self::SHOP_MANAGER );
	}
}
