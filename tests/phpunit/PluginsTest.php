<?php

namespace NewfoldLabs\WP\Module\ECommerce\Tests\PHPUnit;

use NewfoldLabs\WP\Module\ECommerce\Data\Plugins;
use PHPUnit\Framework\TestCase;

/**
 * Unit tests for Data\Plugins (no WordPress required).
 *
 * @covers \NewfoldLabs\WP\Module\ECommerce\Data\Plugins
 */
class PluginsTest extends TestCase {

	/**
	 * supported_plugins() returns an array merging supported, free, and premium.
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
	 * supported_plugins contains woocommerce with expected file and url.
	 *
	 * @return void
	 */
	public function test_supported_plugins_woocommerce_structure() {
		$supported = Plugins::$supported_plugins;
		$this->assertArrayHasKey( 'woocommerce', $supported );
		$this->assertSame( 'woocommerce/woocommerce.php', $supported['woocommerce']['file'] );
		$this->assertSame( 'admin.php?page=wc-settings', $supported['woocommerce']['url'] );
	}

	/**
	 * free_plugins entries have url and file keys.
	 *
	 * @return void
	 */
	public function test_free_plugins_structure() {
		$this->assertIsArray( Plugins::$free_plugins );
		foreach ( array_slice( Plugins::$free_plugins, 0, 3 ) as $slug => $info ) {
			$this->assertIsString( $slug );
			$this->assertArrayHasKey( 'url', $info );
			$this->assertArrayHasKey( 'file', $info );
		}
	}

	/**
	 * premium_plugins is an array (structure may vary).
	 *
	 * @return void
	 */
	public function test_premium_plugins_is_array() {
		$this->assertIsArray( Plugins::$premium_plugins );
	}
}
