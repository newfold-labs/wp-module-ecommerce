<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\ECommerce\Data\Plugins;

/**
 * Data\Plugins wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ECommerce\Data\Plugins
 */
class DataPluginsWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * supported_plugins returns merged array including free and supported plugins.
	 *
	 * @return void
	 */
	public function test_supported_plugins_returns_merged_array() {
		$merged = Plugins::supported_plugins();
		$this->assertIsArray( $merged );
		$this->assertArrayHasKey( 'woocommerce', $merged );
		$this->assertArrayHasKey( 'jetpack', $merged );
		$this->assertArrayHasKey( 'wpforms-lite', $merged );
	}

	/**
	 * free_plugins has expected structure (url and file keys).
	 *
	 * @return void
	 */
	public function test_free_plugins_has_url_and_file() {
		$this->assertIsArray( Plugins::$free_plugins );
		foreach ( array_slice( Plugins::$free_plugins, 0, 3 ) as $slug => $info ) {
			$this->assertIsString( $slug );
			$this->assertArrayHasKey( 'url', $info );
			$this->assertArrayHasKey( 'file', $info );
		}
	}

	/**
	 * supported_plugins contains woocommerce with file and url.
	 *
	 * @return void
	 */
	public function test_supported_plugins_includes_woocommerce() {
		$supported = Plugins::$supported_plugins;
		$this->assertArrayHasKey( 'woocommerce', $supported );
		$this->assertSame( 'woocommerce/woocommerce.php', $supported['woocommerce']['file'] );
		$this->assertSame( 'admin.php?page=wc-settings', $supported['woocommerce']['url'] );
	}
}
