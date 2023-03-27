<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

/**
 * List of Plugin Slugs/Files
 */
final class Plugins {

	public static $supported_plugins = array(
		'yith_wcmap_panel'                     => 'yith-woocommerce-customize-myaccount-page-extended/init.php',
		'yith_woocommerce_gift_cards_panel'    => 'yith-woocommerce-gift-cards-extended/init.php',
		'yith_wcwl_panel'                      => 'yith-woocommerce-wishlist-extended/init.php',
		'yith_wcan_panel'                      => 'yith-woocommerce-ajax-product-filter-extended/init.php',
		'yith_wcbk_panel'                      => 'yith-woocommerce-booking-extended/init.php',
		'yith_wcas_panel'                      => 'yith-woocommerce-ajax-search/init.php',
		'yith_shippo_shipping_for_woocommerce' => 'yith-shippo-shippings-for-woocommerce-extended/init.php',
		'yith_paypal_payments'                 => 'yith-paypal-payments-for-woocommerce-extended/init.php',
		'woocommerce'                          => 'woocommerce/woocommerce.php',
		'nfd_slug_ecomdash_wordpress_plugin'   => 'ecomdash-wordpress-plugin/ecomdash-plugin.php',
		'nfd_slug_woo_razorpay'                => 'woo-razorpay/woo-razorpay.php',
	);

	public static function supported_plugins() {
		return Plugins::$supported_plugins;
	}

}
