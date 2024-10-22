<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

/**
 * List of Plugin Slugs/Files
 */
final class Plugins {

	/**
	 * An associative array of free plugins with their corresponding admin page URLs and file paths.
	 *
	 * @var array<string, array<string, string>> $free_plugins
	 */
	public static $free_plugins = array(
		'jetpack'                           => array(
			'url'  => 'admin.php?page=jetpack#/dashboard',
			'file' => 'jetpack/jetpack.php',
		),
		'jetpack-boost'                     => array(
			'url'  => 'admin.php?page=jetpack-boost',
			'file' => 'jetpack-boost/jetpack-boost.php',
		),
		'wordpress-seo'                     => array(
			'url'  => 'admin.php?page=wpseo_dashboard',
			'file' => 'wordpress-seo/wp-seo.php',
		),
		'wpforms-lite'                      => array(
			'url'  => 'admin.php?page=wpforms-overview',
			'file' => 'wpforms-lite/wpforms.php',
		),
		'google-analytics-for-wordpress'    => array(
			'url'  => 'admin.php?page=monsterinsights_reports',
			'file' => 'google-analytics-for-wordpress/googleanalytics.php',
		),
		'optinmonster'                      => array(
			'url'  => 'admin.php?page=optin-monster-dashboard',
			'file' => 'optinmonster/optin-monster-wp-api.php',
		),
		'creative-mail-by-constant-contact' => array(
			'url'  => 'admin.php?page=creativemail',
			'file' => 'creative-mail-by-constant-contact/creative-mail-plugin.php',
		),
	);

	/**
	 * An associative array of premium plugins with their corresponding admin page URLs and file paths.
	 *
	 * @var array<string, array<string, string>> $free_plugins
	 */
	public static $premium_plugins = array(
		
		//Search Engine Optimization
		'wp-seo' => array(
			'url' => 'admin.php?page=wpseo_dashboard#top#first-time-configuration',
			'file' => 'wordpress-seo/wp-seo.php' 
		),
		//Offer Content Courses
		'sensei-lms' => array(
			'url' => 'post-new.php?post_type=course',
			'file' => 'sensei-lms/sensei-lms.php'
		),
		//Add An Affiliate Program
		'yith-woocommerce-affiliates' => array(
			'url' => 'admin.php?page=yith_wcaf_panel&tab=settings&sub_tab=settings-general',
			'file' => 'yith-woocommerce-affiliates-premium/init.php'
		),
		//Setup Bookings
		'yith-woocommerce-booking' => array(
			'url' => 'edit.php?post_type=yith_booking&yith-plugin-fw-panel-skip-redirect=1',
			'file' => 'yith-woocommerce-booking-premium/init.php'
		),
		//Setup A Loyalty Program
		'yith-woocommerce-points-and-rewards' => array(
			'url' => 'admin.php?page=yith_woocommerce_points_and_rewards&tab=points&sub_tab=points-standard',
			'file' => 'yith-woocommerce-points-and-rewards-premium/init.php'
		),
		//Setup WishList
		'yith-woocommerce-wishlist' => array(
			'url' => 'admin.php?page=yith_wcwl_panel&tab=settings&sub_tab=settings-general',
			'file' => 'yith-woocommerce-wishlist-premium/init.php'
		),
		//Enable Product Reviews
		'yith-woocommerce-advanced-reviews' => array(
			'url' => 'admin.php?page=yith_ywar_panel',
			'file' => 'yith-woocommerce-advanced-reviews-premium/init.php'
		),
		//Create a Sales Campaign
		'yith-woocommerce-dynamic-pricing-and-discounts' => array(
			'url' => 'edit.php?post_type=ywdpd_discount&yith-plugin-fw-panel-skip-redirect=1',
			'file' => 'yith-woocommerce-dynamic-pricing-and-discounts/init.php'
		)
	);

	/**
	 * An associative array of supported plugins with their corresponding file paths and admin page URLs.
	 *
	 *  @var array<string, array<string, string>> $supported_plugins
	 */
	public static $supported_plugins = array(
		'woocommerce'                                    => array(
			'file' => 'woocommerce/woocommerce.php',
			'url'  => 'admin.php?page=wc-settings',
		),
		'nfd_slug_yith_woocommerce_customize_myaccount_page' => array(
			'file_extended' => 'yith-woocommerce-customize-myaccount-page-extended/init.php',
			'file_premium'  => 'yith-woocommerce-customize-myaccount-page-premium/init.php',
			'file'          => 'yith-woocommerce-customize-myaccount-page/init.php',
			'url'           => 'admin.php?page=yith_wcmap_panel',
		),
		'nfd_slug_yith_woocommerce_gift_cards'           => array(
			'file_extended' => 'yith-woocommerce-gift-cards-extended/init.php',
			'file_premium'  => 'yith-woocommerce-gift-cards-premium/init.php',
			'file'          => 'yith-woocommerce-gift-cards/init.php',
			'url'           => 'admin.php?page=yith_woocommerce_gift_cards_panel',
		),
		'nfd_slug_yith_woocommerce_wishlist'             => array(
			'file_extended' => 'yith-woocommerce-wishlist-extended/init.php',
			'file_premium'  => 'yith-woocommerce-wishlist-premium/init.php',
			'file'          => 'yith-woocommerce-wishlist/init.php',
			'url'           => 'admin.php?page=yith_wcwl_panel',
		),
		'nfd_slug_yith_woocommerce_ajax_product_filter'  => array(
			'file_extended' => 'yith-woocommerce-ajax-product-filter-extended/init.php',
			'file_premium'  => 'yith-woocommerce-ajax-product-filter-premium/init.php',
			'file'          => 'yith-woocommerce-ajax-product-filter/init.php',
			'url'           => 'admin.php?page=yith_wcan_panel',
		),
		'nfd_slug_yith_woocommerce_booking'              => array(
			'file_extended' => 'yith-woocommerce-booking-extended/init.php',
			'file_premium'  => 'yith-woocommerce-booking-premium/init.php',
			'file'          => 'yith-woocommerce-booking/init.php',
			'url'           => 'admin.php?page=yith_wcbk_panel',
		),
		'yith-woocommerce-ajax-search'                   => array(
			'file_extended' => 'yith-woocommerce-ajax-search-extended/init.php',
			'file_premium'  => 'yith-woocommerce-ajax-search-premium/init.php',
			'file'          => 'yith-woocommerce-ajax-search/init.php',
			'url'           => 'admin.php?page=yith_wcas_panel',
		),
		'nfd_slug_yith_shippo_shippings_for_woocommerce' => array(
			'file' => 'yith-shippo-shippings-for-woocommerce-extended/init.php',
			'url'  => 'admin.php?page=yith_shippo_shipping_for_woocommerce',
		),
		'nfd_slug_yith_paypal_payments_for_woocommerce'  => array(
			'file' => 'yith-paypal-payments-for-woocommerce-extended/init.php',
			'url'  => 'admin.php?page=yith_paypal_payments',
		),
		'nfd_slug_ecomdash_wordpress_plugin'             => array(
			'file' => 'ecomdash-wordpress-plugin/ecomdash-plugin.php',
			'url'  => 'admin.php?page=newfold-ecomdash',
		),
		'nfd_slug_woo_razorpay'                          => array(
			'file' => 'woo-razorpay/woo-razorpay.php',
			'url'  => 'admin.php?page=wc-settings&tab=checkout&section=razorpay',
		),
		'nfd_slug_wonder_cart'                           => array(
			'file' => 'wonder-cart/init.php',
			'url'  => 'admin.php?page=wonder-cart',
		),
		'nfd_slug_yith_stripe_payments_for_woocommerce'  => array(
			'file' => 'yith-stripe-payments-for-woocommerce-extended/init.php',
			'url'  => 'admin.php?page=yith_stripe_payments_panel',
		),
	);

	/**
	 * Get a merged array of supported and free plugins.
	 *
	 * @return array<string, array<string, string>> A combined array of supported and free plugins.
	 */
	public static function supported_plugins() {
		return array_merge( self::$supported_plugins, self::$free_plugins, self::$premium_plugins );
	}
}
