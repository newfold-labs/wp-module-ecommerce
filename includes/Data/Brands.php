<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;
  /**
 * Contains Brand information.
 */
final class Brands {
	/**
	 * Brand specific data - Bluehost, Bluhost India
	 *
	 * @return array
	 */
	public static function get_brands() {

		return array(
			'bluehost'       => array(
				'brand'                       => 'bluehost',
				'name'                        => 'Bluehost',
				'url'                         => 'https://bluehost.com',
                'hireExpertsInfo'   => 'admin.php?page=bluehost#/marketplace/services/blue-sky',
                'adminPage'         => 'admin.php?page=bluehost',
				'setup'                => array(
					'payment'   => 'Paypal',
					'shipping'  => 'Shippo',
				),
                'defaultContact'       => array(
					'woocommerce_default_country'   => 'US:AZ',
					'woocommerce_currency'          => 'USD',
				),
			),
			'bluehost-india' => array(
				'brand'                       => 'bluehost-india',
				'name'                        => 'Bluehost',
				'url'                         => 'https://bluehost.in',
                'hireExpertsInfo'   => '',
                'adminPage'         => '',
				'setup'                => array(
					'payment'   => 'Razorpay',
					'shipping'  => '',
				),
                'defaultContact'       => array(
					'woocommerce_default_country'   => 'IN:AP',
					'woocommerce_currency'          => 'INR',
				),

			),
		);
	}
}
