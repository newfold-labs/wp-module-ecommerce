<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

/**
 * List of Plugin Slugs/Files
 */
final class Plugins
{

	public static $free_plugins = array(
		'jetpack' => array(
			'url' => 'admin.php?page=jetpack#/dashboard',
			'file' => 'jetpack/jetpack.php',
		),
		'jetpack-boost' => array(
			'url' => 'admin.php?page=jetpack-boost',
			'file' => 'jetpack-boost/jetpack-boost.php',
		),
		'wordpress-seo' => array(
			'url' => 'admin.php?page=wpseo_dashboard',
			'file' => 'wordpress-seo/wp-seo.php',
		),
		'wpforms-lite' => array(
			'url' => 'admin.php?page=wpforms-overview',
			'file' => 'wpforms-lite/wpforms.php',
		),
		'google-analytics-for-wordpress' => array(
			'url' => 'admin.php?page=monsterinsights_reports',
			'file' => 'google-analytics-for-wordpress/googleanalytics.php',
		),
		'optinmonster' => array(
			'url' => 'admin.php?page=optin-monster-dashboard',
			'file' => 'optinmonster/optin-monster-wp-api.php',
		),
		'creative-mail-by-constant-contact' => array(
			'url' => 'admin.php?page=creativemail',
			'file' => 'creative-mail-by-constant-contact/creative-mail-plugin.php',
		),
	);


	public static $supported_plugins = array(
		'woocommerce' => array(
			'file' => 'woocommerce/woocommerce.php',
			'url' => 'admin.php?page=wc-settings',
		),
		'nfd_slug_yith_woocommerce_customize_myaccount_page' => array(
			'file' => 'yith-woocommerce-customize-myaccount-page-extended/init.php',
			'url' => 'admin.php?page=yith_wcmap_panel',
		),
		'nfd_slug_yith_woocommerce_gift_cards' => array(
			'file' => 'yith-woocommerce-gift-cards-extended/init.php',
			'url' => 'admin.php?page=yith_woocommerce_gift_cards_panel',
		),
		'nfd_slug_yith_woocommerce_wishlist' => array(
			'file' => 'yith-woocommerce-wishlist-extended/init.php',
			'url' => 'admin.php?page=yith_wcwl_panel',
		),
		'nfd_slug_yith_woocommerce_ajax_product_filter' => array(
			'file' => 'yith-woocommerce-ajax-product-filter-extended/init.php',
			'url' => 'admin.php?page=yith_wcan_panel',
		),
		'nfd_slug_yith_woocommerce_booking' => array(
			'file' => 'yith-woocommerce-booking-extended/init.php',
			'url' => 'admin.php?page=yith_wcbk_panel',
		),
		'yith-woocommerce-ajax-search' => array(
			'file' => 'yith-woocommerce-ajax-search/init.php',
			'url' => 'admin.php?page=yith_wcas_panel',
		),
		'nfd_slug_yith_shippo_shippings_for_woocommerce' => array(
			'file' => 'yith-shippo-shippings-for-woocommerce-extended/init.php',
			'url' => 'admin.php?page=yith_shippo_shipping_for_woocommerce',
		),
		'nfd_slug_yith_paypal_payments_for_woocommerce' => array(
			'file' => 'yith-paypal-payments-for-woocommerce-extended/init.php',
			'url' => 'admin.php?page=yith_paypal_payments',
		),
		'nfd_slug_ecomdash_wordpress_plugin' => array(
			'file' => 'ecomdash-wordpress-plugin/ecomdash-plugin.php',
			'url' => 'admin.php?page=newfold-ecomdash',
		),
		'nfd_slug_woo_razorpay' => array(
			'file' => 'woo-razorpay/woo-razorpay.php',
			'url' => 'admin.php?page=wc-settings&tab=checkout&section=razorpay',
		),
		'nfd_slug_wonder_cart' => array(
			'file' => 'wonder-cart/init.php',
			'url' => 'admin.php?page=wonder-cart',
		),
	);

	public static function supported_plugins()
	{
		return array_merge(Plugins::$supported_plugins, Plugins::$free_plugins);
	}

}