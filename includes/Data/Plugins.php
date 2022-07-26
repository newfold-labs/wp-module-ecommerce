<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

/**
 * List of Plugin Slugs/URLs/Domains
 */
final class Plugins {

    /*
     A value of true indicates that the slug/url/domain has been approved.
       A value of null indicates that the slug/url/domain has not been approved
       (or) has been temporarily deactivated.
    */

    protected static $wp_slugs = array(
        'jetpack'       => true,
        'woocommerce'   => true,
        'wordpress-seo' => true,
        'wpforms-lite'  => true,
        'yith-woocommerce-ajax-search' => true,
    );

    protected static $urls = array(
        'https://downloads.wordpress.org/plugin/google-analytics-for-wordpress.8.5.3.zip' => true,
        'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-customize-myaccount-page' => true,
        'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-gift-cards' => true,
        'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-wishlist' => true,
        'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-ajax-product-filter' => true,
        'https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-booking' => true,
        'https://downloads.wordpress.org/plugin/yith-woocommerce-ajax-search.1.21.0.zip' => true,
        'https://hiive.cloud/workers/plugin-downloads/yith-shippo-shippings-for-woocommerce' => true,
        'https://hiive.cloud/workers/plugin-downloads/yith-paypal-payments-for-woocommerce' => true,
    );

    protected static $domains = array(
        'downloads.wordpress.org' => true,
        'nonapproveddomain.com'   => null,
    );

    /**
     * @return array
     */
    public static function get_wp_slugs() {
        return self::$wp_slugs;
    }

    /**
     * @return array
     */
    public static function get_urls() {
        return self::$urls;
    }

    /**
     * @return array
     */
    public static function get_domains() {
        return self::$domains;
    }

    /**
     * Use this return value for a faster search of slug/url/domain.
     *
     * @return array
     */
    public static function get() {
        return array(
            'wp_slugs' => self::$wp_slugs,
            'urls'     => self::$urls,
            'domains'  => self::$domains,
        );
    }

    public static function get_slug_map($plugin) {
       $map = array(
           'yith_wcmap_panel' => ['https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-customize-myaccount-page','yith-woocommerce-customize-myaccount-page-extended/init.php'],
           'yith_woocommerce_gift_cards_panel' => ['https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-gift-cards','yith-woocommerce-gift-cards-extended/init.php'],
           'yith_wcwl_panel' => ['https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-wishlist','yith-woocommerce-wishlist-extended/init.php'],
           'yith_wcan_panel' => ['https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-ajax-product-filter','yith-woocommerce-ajax-product-filter-extended/init.php'],
           'yith_wcbk_panel' => ['https://hiive.cloud/workers/plugin-downloads/yith-woocommerce-booking','yith-woocommerce-booking-extended/init.php'],
           'yith_wcas_panel' => ['https://downloads.wordpress.org/plugin/yith-woocommerce-ajax-search.1.21.0.zip','yith-woocommerce-ajax-search/init.php'],
           'yith_shippo_shipping_for_woocommerce' => ['https://hiive.cloud/workers/plugin-downloads/yith-shippo-shippings-for-woocommerce','yith-shippo-shippings-for-woocommerce-extended/init.php'],
           'yith_paypal_payments' => ['https://hiive.cloud/workers/plugin-downloads/yith-paypal-payments-for-woocommerce','yith-paypal-payments-for-woocommerce-extended/init.php']
       );
       if (in_array($plugin, array_keys($map))) {
            $plugin = $map[$plugin];
        }
       return $plugin;
    }

    /**
     * Get approved slugs/urls/domains
     *
     * @return array
     */
    public static function get_approved() {
        return array(
            'wp_slugs' => array_keys( self::$wp_slugs, true ),
            'urls'     => array_keys( self::$urls, true ),
            'domains'  => array_keys( self::$domains, true ),
        );
    }

}