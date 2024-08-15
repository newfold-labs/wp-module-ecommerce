<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

use NewfoldLabs\WP\ModuleLoader\Container;
/**
 * Contains Brand information.
 */
final class Brands {
	/**
	 * Retrieve and sanitize the brand name from the container.
	 *
	 * @param Container $container The container object that holds the plugin instance.
	 * @return string The sanitized brand name
	 * */
	private static function get_brand_name( Container $container ) {
		$brand_raw_value = $container->plugin()->brand;
		return \sanitize_title( str_replace( '_', '-', $brand_raw_value ) );
	}
	/**
	 * Brand specific data
	 *
	 * @param Container $container The container object
	 * @return array
	 */
	public static function get_config( Container $container ) {
		$brand = self::get_brand_name( $container );
		switch ( $brand ) {
			case 'crazy-domains':
				return array(
					'brand'            => 'crazy-domains',
					'name'             => 'CrazyDomains',
					'url'              => 'https://crazydomains.com',
					'hireExpertsInfo'  => 'admin.php?page=crazy-domains#/marketplace/services/blue-sky',
					'support'          => 'https://www.crazydomains.in/contact',
					'adminPage'        => 'admin.php?page=crazy-domains',
					'setup'            => array(
						'payment'  => array( 'PayPal' ),
						'shipping' => array( 'Shippo' ),
					),
					'defaultContact'   => array(
						'woocommerce_default_country' => 'AU:NSW',
						'woocommerce_currency'        => 'AUD',
					),
					'wondercartBuyNow' => '',
				);

			case 'bluehost-india':
				return array(
					'brand'            => 'bluehost-india',
					'name'             => 'Bluehost',
					'url'              => 'https://bluehost.in',
					'hireExpertsInfo'  => 'https://www.bluehost.in/solutions/full-service',
					'support'          => 'https://helpchat.bluehost.in',
					'adminPage'        => 'admin.php?page=bluehost',
					'setup'            => array(
						'payment'  => array( 'PayPal', 'Razorpay', 'Stripe' ),
						'shipping' => array(),
					),
					'defaultContact'   => array(
						'woocommerce_default_country' => 'IN:AP',
						'woocommerce_currency'        => 'INR',
					),
					'wondercartBuyNow' => '',
				);
			case 'hostgator':
			case 'hostgator-latam':
				return array(
					'brand'            => 'hostgator',
					'name'             => 'hostgator',
					'url'              => 'https://hostgator.com',
					'hireExpertsInfo'  => 'admin.php?page=hostgator#/marketplace/services/blue-sky',
					'support'          => 'https://www.hostgator.com/contact',
					'adminPage'        => 'admin.php?page=hostgator',
					'setup'            => array(
						'payment'  => array( 'PayPal', 'Razorpay', 'Stripe' ),
						'shipping' => array(),
					),
					'defaultContact'   => array(
						'woocommerce_default_country' => 'BR:AL',
						'woocommerce_currency'        => 'BRL',
					),
					'wondercartBuyNow' => '',
				);
			case 'bluehost':
			default:
				return array(
					'brand'            => 'bluehost',
					'name'             => 'Bluehost',
					'url'              => 'https://bluehost.com',
					'hireExpertsInfo'  => 'admin.php?page=bluehost#/marketplace/services/blue-sky',
					'support'          => 'https://www.bluehost.com/contact',
					'adminPage'        => 'admin.php?page=bluehost',
					'setup'            => array(
						'payment'  => array( 'PayPal', 'Razorpay', 'Stripe' ),
						'shipping' => array( 'Shippo' ),
					),
					'defaultContact'   => array(
						'woocommerce_default_country' => 'US:AZ',
						'woocommerce_currency'        => 'USD',
					),
					'wondercartBuyNow' => 'https://my.bluehost.com/hosting/app?utm_source=wp-marketplace&utm_medium=brand-plugin&utm_campaign=wordpress-ad&utm_content=buynow#/marketplace/product',
				);
		}
	}
}
