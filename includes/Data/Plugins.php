<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

/**
 * List of Plugin Slugs/URLs/Domains
 */
final class Plugins {

	public static function get_slug_map( $plugin ) {
		$map = array(
			'yith_wcmap_panel'                     => array( 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-customize-myaccount-page', 'yith-woocommerce-customize-myaccount-page-extended/init.php' ),
			'yith_woocommerce_gift_cards_panel'    => array( 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-gift-cards', 'yith-woocommerce-gift-cards-extended/init.php' ),
			'yith_wcwl_panel'                      => array( 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-wishlist', 'yith-woocommerce-wishlist-extended/init.php' ),
			'yith_wcan_panel'                      => array( 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-ajax-product-filter', 'yith-woocommerce-ajax-product-filter-extended/init.php' ),
			'yith_wcbk_panel'                      => array( 'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-booking', 'yith-woocommerce-booking-extended/init.php' ),
			'yith_wcas_panel'                      => array( 'https://downloads.wordpress.org/plugin/yith-woocommerce-ajax-search.1.21.0.zip', 'yith-woocommerce-ajax-search/init.php' ),
			'yith_shippo_shipping_for_woocommerce' => array( 'https://hiive.cloud/workers/plugin-downloads/yith-shippo-shippings-for-woocommerce', 'yith-shippo-shippings-for-woocommerce-extended/init.php' ),
			'yith_paypal_payments'                 => array( 'https://hiive.cloud/workers/plugin-downloads/yith-paypal-payments-for-woocommerce', 'yith-paypal-payments-for-woocommerce-extended/init.php' ),
			'woocommerce'                          => array( 'ignore', 'woocommerce/woocommerce.php' ),
		);
		if ( in_array( $plugin, array_keys( $map ) ) ) {
			$plugin = $map[ $plugin ];
		}
		return $plugin;
	}

}
