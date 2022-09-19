DELETE FROM `wp_options` WHERE `option_name` IN (
    'nfd-ecommerce-captive-flow-paypal',
    'nfd-ecommerce-captive-flow-shippo',
    'woocommerce_onboarding_profile',
    'woocommerce_store_address',
    'woocommerce_store_address_2',
    'woocommerce_store_city',
    'woocommerce_store_postcode',
    'woocommerce_default_country',
    'wc_connect_taxes_enabled',
    'woocommerce_calc_taxes',
    'woocommerce_no_sales_tax'
)