<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\ECommerce\Data\Brands;
use NewfoldLabs\WP\Module\ECommerce\Data\Plugins;
use NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow;

/**
 * Module loading wpunit tests.
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ECommerce\ECommerce
 */
class ModuleLoadingWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Verify core module classes exist.
	 *
	 * @return void
	 */
	public function test_module_classes_load() {
		$this->assertTrue( class_exists( ECommerce::class ) );
		$this->assertTrue( class_exists( Brands::class ) );
		$this->assertTrue( class_exists( Plugins::class ) );
		$this->assertTrue( class_exists( StoreInfo::class ) );
		$this->assertTrue( class_exists( I18nService::class ) );
		$this->assertTrue( class_exists( Permissions::class ) );
		$this->assertTrue( class_exists( CaptiveFlow::class ) );
	}

	/**
	 * Verify WordPress factory is available.
	 *
	 * @return void
	 */
	public function test_wordpress_factory_available() {
		$this->assertTrue( function_exists( 'get_option' ) );
		$this->assertNotEmpty( get_option( 'blogname' ) );
	}
}
