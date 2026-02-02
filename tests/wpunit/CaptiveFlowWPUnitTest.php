<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow;

/**
 * CaptiveFlow partial wpunit tests (output).
 *
 * @coversDefaultClass \NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow
 */
class CaptiveFlowWPUnitTest extends \lucatume\WPBrowser\TestCase\WPTestCase {

	/**
	 * Captive flow option names are defined.
	 *
	 * @return void
	 */
	public function test_captive_flow_constants() {
		$this->assertSame( 'nfd-ecommerce-captive-flow-paypal', CaptiveFlow::$paypal_captive_flow );
		$this->assertSame( 'nfd-ecommerce-captive-flow-shippo', CaptiveFlow::$shippo_captive_flow );
		$this->assertSame( 'nfd-ecommerce-captive-flow-razorpay', CaptiveFlow::$razorpay_captive_flow );
	}

	/**
	 * render_paypal outputs expected wrapper and action hook div.
	 *
	 * @return void
	 */
	public function test_render_paypal_output() {
		ob_start();
		CaptiveFlow::render_paypal();
		$output = ob_get_clean();
		$this->assertStringContainsString( 'id="nfd-ecommerce"', $output );
		$this->assertStringContainsString( 'class="nfd-ecommerce-captive-flow"', $output );
		$this->assertStringContainsString( '<div', $output );
	}

	/**
	 * render_shippo outputs expected wrapper and action hook div.
	 *
	 * @return void
	 */
	public function test_render_shippo_output() {
		ob_start();
		CaptiveFlow::render_shippo();
		$output = ob_get_clean();
		$this->assertStringContainsString( 'id="nfd-ecommerce"', $output );
		$this->assertStringContainsString( 'class="nfd-ecommerce-captive-flow"', $output );
		$this->assertStringContainsString( '<div', $output );
	}
}
