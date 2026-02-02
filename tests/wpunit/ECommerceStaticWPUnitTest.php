<?php

namespace NewfoldLabs\WP\Module\ECommerce;

/**
 * ECommerce static and instance methods wpunit tests (no container-heavy behavior).
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ECommerce\ECommerce
 */
class ECommerceStaticWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Mock container for ECommerce (minimal plugin id/brand).
	 *
	 * @var object
	 */
	private $mock_container;

	/**
	 * @var ECommerce
	 */
	private $ecommerce;

	/**
	 * Set up test.
	 *
	 * @return void
	 */
	public function setUp(): void {
		parent::setUp();
		$this->mock_container = new class() {
			public function plugin() {
				$o         = new \stdClass();
				$o->id     = 'bluehost';
				$o->brand  = 'bluehost';
				$o->url    = 'https://example.com/wp-content/plugins/bluehost/';
				$o->dir    = dirname( dirname( dirname( __DIR__ ) ) );
				$o->basename = 'bluehost/bluehost-wordpress-plugin.php';
				return $o;
			}
		};
		$this->ecommerce = new ECommerce( $this->mock_container );
	}

	/**
	 * add_filters adds a single filter when given a string tag.
	 *
	 * @return void
	 */
	public function test_add_filters_single_tag() {
		$ran = false;
		$cb  = function () use ( &$ran ) {
			$ran = true;
			return 'ok';
		};
		$result = ECommerce::add_filters( 'test_add_filters_single', $cb );
		$this->assertTrue( $result );
		$this->assertSame( 'ok', apply_filters( 'test_add_filters_single', '' ) );
		$this->assertTrue( $ran );
	}

	/**
	 * add_filters adds to multiple tags when given array of tags.
	 *
	 * @return void
	 */
	public function test_add_filters_multiple_tags() {
		$count = 0;
		$cb    = function () use ( &$count ) {
			++$count;
			return $count;
		};
		ECommerce::add_filters( array( 'test_add_filters_multi_1', 'test_add_filters_multi_2' ), $cb );
		apply_filters( 'test_add_filters_multi_1', '' );
		apply_filters( 'test_add_filters_multi_2', '' );
		$this->assertSame( 2, $count );
	}

	/**
	 * check_url_match returns false for bluehost when URL matches mybluehost.me.
	 *
	 * @return void
	 */
	public function test_check_url_match_bluehost_mybluehost_me_returns_false() {
		$this->assertFalse( $this->ecommerce->check_url_match( 'bluehost', 'https://foo.mybluehost.me/path' ) );
	}

	/**
	 * check_url_match returns true for bluehost when URL does not match mybluehost.me.
	 *
	 * @return void
	 */
	public function test_check_url_match_bluehost_other_domain_returns_true() {
		$this->assertTrue( $this->ecommerce->check_url_match( 'bluehost', 'https://example.com' ) );
	}

	/**
	 * check_url_match returns false for hostgator when URL matches temporary.site.
	 *
	 * @return void
	 */
	public function test_check_url_match_hostgator_temporary_site_returns_false() {
		$this->assertFalse( $this->ecommerce->check_url_match( 'hostgator', 'https://foo.temporary.site/' ) );
	}

	/**
	 * check_url_match returns true for unknown brand.
	 *
	 * @return void
	 */
	public function test_check_url_match_unknown_brand_returns_true() {
		$this->assertTrue( $this->ecommerce->check_url_match( 'unknown', 'https://example.com' ) );
	}

	/**
	 * disable_modern_payments_settings sets reactify-classic-payments-settings to false.
	 *
	 * @return void
	 */
	public function test_disable_modern_payments_settings() {
		$features = array( 'other' => true );
		$result   = $this->ecommerce->disable_modern_payments_settings( $features );
		$this->assertArrayHasKey( 'reactify-classic-payments-settings', $result );
		$this->assertFalse( $result['reactify-classic-payments-settings'] );
		$this->assertTrue( $result['other'] );
	}
}
