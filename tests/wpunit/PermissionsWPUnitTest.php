<?php

namespace NewfoldLabs\WP\Module\ECommerce;

/**
 * Permissions wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ECommerce\Permissions
 */
class PermissionsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Admin constant is manage_options.
	 *
	 * @return void
	 */
	public function test_admin_constant() {
		$this->assertSame( 'manage_options', Permissions::ADMIN );
	}

	/**
	 * Shop manager constant is manage_woocommerce.
	 *
	 * @return void
	 */
	public function test_shop_manager_constant() {
		$this->assertSame( 'manage_woocommerce', Permissions::SHOP_MANAGER );
	}

	/**
	 * rest_is_authorized_admin returns false when not logged in.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_admin_when_logged_out() {
		wp_set_current_user( 0 );
		$this->assertFalse( Permissions::rest_is_authorized_admin() );
	}

	/**
	 * rest_is_authorized_shop_manager returns false when not logged in.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_shop_manager_when_logged_out() {
		wp_set_current_user( 0 );
		$this->assertFalse( Permissions::rest_is_authorized_shop_manager() );
	}

	/**
	 * rest_is_authorized_admin returns true for admin user.
	 *
	 * @return void
	 */
	public function test_rest_is_authorized_admin_when_admin() {
		$user_id = self::factory()->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		$this->assertTrue( Permissions::rest_is_authorized_admin() );
	}
}
