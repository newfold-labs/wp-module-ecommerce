<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

/**
 * Contains Brand information.
 */
final class Brands {
	/**
	 * Brand specific data
	 *
	 * @return array
	 */
	public static function get_config( string $brand ) {
		switch ($brand) {
			case 'crazy-domains':
				return array(
					'brand' => 'crazy-domains',
					'name' => 'CrazyDomains',
					'url' => 'https://crazydomains.com',
					'hireExpertsInfo' => 'admin.php?page=crazy-domains#/marketplace/services/blue-sky',
					'support' => 'https://www.crazydomains.in/contact',
					'adminPage' => 'admin.php?page=crazy-domains',
					'setup' => array(
						'payment' => array('Paypal'),
						'shipping' => array('Shippo'),
					),
					'defaultContact' => array(
						'woocommerce_default_country' => 'AU:NSW',
						'woocommerce_currency' => 'AUD',
					),
				);

			case 'bluehost-india':
				return array(
					'brand' => 'bluehost-india',
					'name' => 'Bluehost',
					'url' => 'https://bluehost.in',
					'hireExpertsInfo' => 'https://www.bluehost.in/solutions/full-service',
					'support' => 'https://helpchat.bluehost.in',
					'adminPage' => 'admin.php?page=bluehost',
					'setup' => array(
						'payment' => array('Razorpay'),
						'shipping' => array(),
					),
					'defaultContact' => array(
						'woocommerce_default_country' => 'IN:AP',
						'woocommerce_currency' => 'INR',
					),
				);
			case 'bluehost':
			default:
				return array(
					'brand' => 'bluehost',
					'name' => 'Bluehost',
					'url' => 'https://bluehost.com',
					'hireExpertsInfo' => 'admin.php?page=bluehost#/marketplace/services/blue-sky',
					'support' => 'https://www.bluehost.com/contact',
					'adminPage' => 'admin.php?page=bluehost',
					'setup' => array(
						'payment' => array('Paypal'),
						'shipping' => array('Shippo'),
					),
					'defaultContact' => array(
						'woocommerce_default_country' => 'US:AZ',
						'woocommerce_currency' => 'USD',
					),
				);
		}
	}
}