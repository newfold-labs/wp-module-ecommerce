<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\Module\ECommerce\Data\Brands;
use NewfoldLabs\WP\Module\ECommerce\Partials\CaptiveFlow;
use NewfoldLabs\WP\Module\ECommerce\Partials\WooCommerceBacklink;
use NewfoldLabs\WP\Module\ECommerce\I18nService;
use NewfoldLabs\WP\Module\ECommerce\WonderCart;
use NewfoldLabs\WP\Module\Installer\Services\PluginInstaller;
use NewfoldLabs\WP\ModuleLoader\Container;
use NewfoldLabs\WP\Module\Onboarding\Data\Services\FlowService;
use NewfoldLabs\WP\Module\Data\SiteCapabilities;

/**
 * Class ECommerce
 *
 * @package NewfoldLabs\WP\Module\ECommerce
 */
class ECommerce {
  /**
   * Main Ecommerce file
   *
   * Entry point via bootstrap.php
   */

  /**
   * Container loaded from the brand plugin.
   *
   * @var Container
   */
  protected $container;

  /**
   * Array map of API controllers.
   *
   * @var array
   */
  protected $controllers = array(
    'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\IntegrationsController',
    'NewfoldLabs\\WP\\Module\\ECommerce\\RestApi\\PluginsController',
  );

  /**
   * Option settings
   *
   * @var array
   */
  protected $options = array(
    'nfd-ecommerce-captive-flow-paypal',
    'nfd-ecommerce-captive-flow-shippo',
    'nfd-ecommerce-captive-flow-stripe',
    'nfd-ecommerce-captive-flow-razorpay',
    'nfd-ecommerce-onboarding-check',
    'nfd-ecommerce-counter',
    'woocommerce_store_address',
    'woocommerce_store_address_2',
    'woocommerce_store_city',
    'woocommerce_store_postcode',
    'woocommerce_default_country',
    'wc_connect_taxes_enabled',
    'woocommerce_calc_taxes',
    'woocommerce_currency',
    'woocommerce_email_from_address',
    'woocommerce_bacs_settings',
    'woocommerce_cod_settings',
    'woocommerce_cheque_settings',
    'onboarding_experience_level',
    'yoast_seo_signup_status',
  );
  

  /**
   * ECommerce constructor.
   *
   * @param Container $container Container loaded from the brand plugin.
   */
  public function __construct( Container $container ) {
    $capability = new SiteCapabilities();
    $hasYithExtended = $capability->get( 'hasYithExtended' );
    $canAccessGlobalCTB = $capability->get( 'canAccessGlobalCTB' );

    $this->container = $container;
    // Module functionality goes here
    add_action( 'init', array( $this, 'load_php_textdomain' ) );
    add_action( 'toplevel_page_'. $container->plugin()->id, array( $this, 'load_experience_level' ) );
    add_action( 'admin_init', array( $this, 'maybe_do_dash_redirect' ) );
    add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'register_assets' ) );
    add_action( 'load-toplevel_page_' . $container->plugin()->id, array( $this, 'register_textdomains' ) );
    add_filter( 'woocommerce_coupons_enabled',  array( $this, 'disable_coupon_field_on_cart' ) );
    add_filter( 'woocommerce_before_cart', array( $this, 'hide_banner_notice_on_cart'));
    add_action('before_woocommerce_init', array( $this,'hide_woocommerce_set_up') );
    add_filter( 'woocommerce_checkout_fields' , array( $this,'swap_billing_shipping_fields'), 10, 1 );
    add_filter('woocommerce_shipping_fields', array( $this,'add_phone_number_email_to_shipping_form'), 10, 1 );
    add_action('woocommerce_checkout_create_order', array( $this, 'save_custom_shipping_fields' ), 10, 1);
    add_action('woocommerce_admin_order_data_after_shipping_address', array( $this, 'display_custom_shipping_fields_in_admin' ), 10, 1 );
    add_action( 'before_woocommerce_init', array( $this,'custom_payment_gateways_order'));
		add_action('before_woocommerce_init', array( $this,'dismiss_woo_payments_cta'));
		add_action( 'load-toplevel_page_'. $container->plugin()->id, array( $this, 'disable_creative_mail_banner' ) );
    
    $brandNameValue = $container->plugin()->brand;
    $this->set_wpnav_collapse_setting($brandNameValue);

    if (($container->plugin()->id === "bluehost" && ($canAccessGlobalCTB || $hasYithExtended)) || ($container->plugin()->id === "hostgator" && $hasYithExtended))
    { 
      add_filter( 'admin_menu', array($this,'custom_add_promotion_menu_item') );
      add_action( 'woocommerce_product_options_general_product_data', array( $this,'custom_product_general_options'));
      add_action( 'woocommerce_product_options_related',array($this,'custom_product_general_options'));
      add_action( 'woocommerce_product_data_tabs',array( $this, 'custom_product_write_panel_tabs'));
      add_action( 'woocommerce_product_data_panels', array( $this,'promotion_product_data'));
      add_action( 'admin_head', array( $this,'action_admin_head'));
    };
    
    // Handle WonderCart Integrations
    if ( is_plugin_active( 'wonder-cart/init.php' ) ) {
      $wonder_cart = new WonderCart( $container );
      $wonder_cart->init();
    }

    CaptiveFlow::init();
    WooCommerceBacklink::init( $container );
    register_meta(
      'post',
      'nf_dc_page',
      array(
        'type'         => 'string',
        'description'  => 'Reference to page category',
        'show_in_rest' => true,
        'single'       => true,
      )
    );
    add_filter( 'newfold-runtime', array( $this, 'add_to_runtime' ) );
    $this->add_filters(
      array( 'postbox_classes_page_wpseo_meta', 'postbox_classes_post_wpseo_meta', 'postbox_classes_product_wpseo_meta' ),
      function ( $classes ) {
        $classes[] = 'closed';
        return $classes;
      }
    );    
  }

  /**
   * Add multiple filters to a closure
   *
   * @param $tags
   * @param $function_to_add
   * @param int             $priority
   * @param int             $accepted_args
   *
   * @return bool true
   */
  public static function add_filters( $tags, $function_to_add, $priority = 10, $accepted_args = 1 ) {
    // If the filter names are not an array, create an array containing one item
    if ( ! is_array( $tags ) ) {
      $tags = array( $tags );
    }

    // For each filter name
    foreach ( $tags as $index => $tag ) {
      add_filter( $tag, $function_to_add, (int) ( is_array( $priority ) ? $priority[ $index ] : $priority ), (int) ( is_array( $accepted_args ) ? $accepted_args[ $index ] : $accepted_args ) );
    }

    return true;
  }

  public static function set_wpnav_collapse_setting($brandNameValue) {
         
    $expiration_time = time() + (10 * 365 * 24 * 60 * 60);
    setcookie('nfdbrandname', $brandNameValue, $expiration_time, '/');
  
    wp_enqueue_script( 'nfd_wpnavbar_setting', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/wpnavbar.js', array('jquery'), '1.0', true);
         
  }

  /**
   * Loads the textdomain for the module. This applies only to PHP strings.
   *
   * @return boolean
   */
  public static function load_php_textdomain() {
    return I18nService::load_php_translations(
      'wp-module-ecommerce',
      NFD_ECOMMERCE_PLUGIN_DIRNAME . '/vendor/newfold-labs/wp-module-ecommerce/languages'
    );
  }

  public static function load_experience_level() {
    update_option( 'onboarding_experience_level', FlowService::get_experience_level() );
  }

  public function add_to_runtime( $sdk ) {
    $values = array(
      'brand_settings' => Brands::get_config( $this->container ),
      'nonces'         => array(
        'gateway_toggle' => \wp_create_nonce( 'woocommerce-toggle-payment-gateway-enabled' ),
      ),
      'install_token'  => PluginInstaller::rest_get_plugin_install_hash(),
    );
    return array_merge( $sdk, array( 'ecommerce' => $values ) );
  }

  public function maybe_do_dash_redirect() {
    $show_dash = get_option( 'nfd_show_dash_after_woo_activation', false );
    if ( $show_dash && ! wp_doing_ajax() ) {
      update_option( 'nfd_show_dash_after_woo_activation', false );
      wp_safe_redirect( admin_url( 'admin.php?page=' . $this->container->plugin()->id . '#/home' ) );
    }
  }

  /**
   * Register API routes.
   */
  public function register_routes() {
    foreach ( $this->controllers as $Controller ) {
      /**
       * Get an instance of the WP_REST_Controller.
       *
       * @var $instance \WP_REST_Controller
       */
      $instance = new $Controller( $this->container );
      $instance->register_routes();
    }
    $this->register_settings();
  }

  /**
   * Register settings.
   */
  public function register_settings() {
    $option_settings = array(
      'show_in_rest' => true,
      'type'         => 'string',
      'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
    );
    foreach ( $this->options as $option ) {
      \register_setting( 'general', $option, $option_settings );
    }
    \register_setting(
      'general',
      'woocommerce_no_sales_tax',
      array(
        'show_in_rest' => true,
        'type'         => 'boolean',
        'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
      )
    );
    \register_setting(
      'general',
      'bluehost_academy_signup_clicked',
      array(
        'show_in_rest' => true,
        'type'         => 'boolean',
        'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
      )
    );
    \register_setting(
      'general',
      'yoast_seo_signup_status',
      array(
        'show_in_rest' => true,
        'type'         => 'boolean',
        'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
      )
    );
    $payments                    = array(
      'woocommerce_bacs_settings',
      'woocommerce_cod_settings',
      'woocommerce_cheque_settings',
    );
    $schema_for_offline_payments = array(
      'show_in_rest' => array(
        'schema' => array(
          'type'       => 'object',
          'properties' => array(
            'gateway_id' => array(
              'type' => 'string',
            ),
            'enabled'    => array(
              'type' => 'string',
            ),
            'action'     => array(
              'type' => 'string',
            ),
            'security'   => array(
              'type' => 'string',
            ),
          ),
        ),
      ),
      'type'         => 'object',
      'description'  => __( 'NFD eCommerce Options', 'wp-module-ecommerce' ),
    );
    foreach ( $payments as $payment ) {
      \register_setting( 'general', $payment, $schema_for_offline_payments );
    }
  }

	public function register_textdomains() {
		$MODULE_LANG_DIR = $this->container->plugin()->dir . 'vendor/newfold-labs/wp-module-ecommerce/languages';
		\load_script_textdomain( 'nfd-ecommerce-dependency', 'wp-module-ecommerce', $MODULE_LANG_DIR );
		$current_language = get_locale();
		\load_textdomain( 'wp-module-ecommerce', $MODULE_LANG_DIR."/wp-module-ecommerce-".$current_language.".mo" );
	}

  /**
   * Load WP dependencies into the page.
   */
  public function register_assets() {
    $asset_file = NFD_ECOMMERCE_BUILD_DIR . 'index.asset.php';
    if ( file_exists( $asset_file ) ) {
      $asset = require $asset_file;
      \wp_register_script(
        'nfd-ecommerce-dependency',
        NFD_ECOMMERCE_PLUGIN_URL,
        array_merge( $asset['dependencies'], array() ),
        $asset['version']
      );
      I18nService::load_js_translations(
        'wp-module-ecommerce',
        'nfd-ecommerce-dependency',
        NFD_ECOMMERCE_DIR . '/languages'
      );
      \wp_enqueue_script( 'nfd-ecommerce-dependency' );
      \wp_enqueue_script( 'nfd_wpnavbar_setting' );
    }
  }

  /**
  * Remove Add coupon field on cart page
  */
  public function disable_coupon_field_on_cart( $enabled ) {
        if ( is_cart() ) {
            $enabled = false;
        }
        return $enabled;
    }

  /**
  * Remove notice banner on cart page
  */
  public function hide_banner_notice_on_cart() {
    if (is_cart()) {
      ?>
      <style>
        .wc-block-components-notice-banner, .ywgc_enter_code {
          display: none;
        }
      </style>
      <?php
    }
  }
  public function hide_woocommerce_set_up() {
    $hidden_list = get_option('woocommerce_task_list_hidden_lists', []);
    if(! in_array("setup", $hidden_list)){
      $woocommerce_list = array_merge(get_option('woocommerce_task_list_hidden_lists', []),array(
        "setup" 
      ));
      // $woocommerce_list = array("setup");
      update_option('woocommerce_task_list_hidden_lists', $woocommerce_list);
    }
    
  }

  /**
   * To show the shipping form first if the ship to destination is set to 'Shipping'
   */
  public function swap_billing_shipping_fields( $fields ) {
    $shipping_destination = get_option( 'woocommerce_ship_to_destination');
    if($shipping_destination == 'shipping') {
      add_filter( 'gettext', array( $this, 'update_text'), 20, 3 );
      ?>
      <script type="text/javascript">
        jQuery(document).ready(function($) {
          $('#ship-to-different-address-checkbox').prop('checked', false); //Uncheck the checkbox
        });
      </script>
      <?php
      // swapping billing and shipping fields
      $billing = $fields["billing"];
      $shipping = $fields["shipping"];
 
      $fields['shipping'] = $billing;
      $fields['billing'] = $shipping;
    }
    return $fields;
  }

  /**
   * Update the heading and checkbox text
   */
  public function update_text( $translated_text, $text, $domain ) {
    switch ( $translated_text ) {
      case 'Billing details' :
        $translated_text = __( 'Shipping details', 'wp_module_ecommerce' );
        break;
      case 'Ship to a different address?' :
        $translated_text = __( 'Bill to a different address?', 'wp_module_ecommerce' );
        break;
    }
    return $translated_text;
  }

  /** 
  *  Add phone number and Email field to WooCommerce shipping form
  */
  public function add_phone_number_email_to_shipping_form($fields) {
    $fields['shipping_phone'] = array(
      'label'         => __('Phone Number', 'wp_module_ecommerce'),
      'required'      => true,
      'class'         => array('form-row-wide'),
      'clear'         => true,
    );
    $fields['shipping_email'] = array(
      'label'         => __('Email Address', 'wp_module_ecommerce'),
      'required'      => true,
      'class'         => array('form-row-wide'),
      'clear'         => true,
    );
    return $fields;
  }

  /*
   * Save phone number and email fields to order meta
   */
  function save_custom_shipping_fields($order) {
    $shipping_phone = isset($_POST['shipping_phone']) ? sanitize_text_field($_POST['shipping_phone']) : '';
    $shipping_email = isset($_POST['shipping_email']) ? sanitize_email($_POST['shipping_email']) : '';
  
    if (!empty($shipping_phone)) {
      $order->update_meta_data('_shipping_phone', $shipping_phone);
    }
  
    if (!empty($shipping_email)) {
      $order->update_meta_data('_shipping_email', $shipping_email);
    }
  }

  /**
   * Display phone number and email fields in order admin
   */
  public function display_custom_shipping_fields_in_admin($order) {
    $shipping_phone = $order->get_meta('_shipping_phone');
    $shipping_email = $order->get_meta('_shipping_email');
  
    if (!empty($shipping_phone)) {
      echo '<p><strong>' . __('Phone Number', 'wp_module_ecommerce') . ':</strong> ' . esc_html($shipping_phone) . '</p>';
    }
  
    if (!empty($shipping_email)) {
      echo '<p><strong>' . __('Email Address', 'wp_module_ecommerce') . ':</strong> ' . esc_html($shipping_email) . '</p>';
    }
  }

	/**
	 * Add promotion (Promote) under WooCommerce Marketing tab
   */
  function custom_add_promotion_menu_item( $menu_items ) {
    add_submenu_page(
      'woocommerce-marketing',
      'Promotion product Page',
      __('Promote','wp_module_ecommerce'),
      'manage_options',
      $this->container->plugin()->id.'#/store/sales_discounts',
      'custom_submenu_redirect'
  );
  }

  
	
	/**
	 * Add a Promotion button under Add New product tab
   */
	function custom_product_general_options() {
		global $post;
		$redirect_url =admin_url( 'admin.php?page='.$this->container->plugin()->id.'#/store/sales_discounts');
    wp_enqueue_style ( 'Create_a_Promotion' , NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Promotions.css' , array (), '1.0' , 'all' );
		echo '<div class="options_group">
            <p class="form-field custom-button-field">
						  <a id="Create_a_Promotion" href="'.$redirect_url.'" class="promotion">'. __('Create a Promotion', 'wp_module_ecommerce').'</a>
					  </p>
          </div>';
	}

	/**
	 * Add a Custom tab (Prmotions tab) button added below Advance tab
   */
	function custom_product_write_panel_tabs( $tabs ) {
		$tabs['custom_tab'] = array(
			'label'   =>  __( 'Promotions', 'wp_module_ecommerce' ),
			'target'  =>  'promotion_product_data',
			'priority' => 70,
			'class'   => array()
		);
    return $tabs;
	}

	/**
	 * Content on click of a Custom tab (Promotions tab) button added below Advance tab
   */
	function promotion_product_data() {
		$redirect_url ='admin.php?page='.$this->container->plugin()->id.'#/store/sales_discounts';
		global $post; 
		echo '<div id="promotion_product_data" class="panel woocommerce_options_panel hidden"></div>';
		\wp_enqueue_script( 'nfd_promotion_product_data', NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/includes/Promotions.js', array('jquery'), '1.0', true);
		$Promotion_data = array(
			'redirectUrl' => $redirect_url,
      'boostYourOnline' =>  __( 'Boost Your Online Store Sales', 'wp_module_ecommerce' ),
      'maximizeYourSales' => __('Maximize your sales by creating effective','wp_module_ecommerce'),
      'promotionsAndCampaigns' => __('promotions and campaigns like:','wp_module_ecommerce'),
      'createPromotion' => __('Create a Promotion', 'wp_module_ecommerce'),
      'free' => __('Free', 'wp_module_ecommerce'),
      'shipping' => __('Shipping', 'wp_module_ecommerce'),
      'buyOne' => __('Buy One', 'wp_module_ecommerce'),
      'getOne' => __('Get One', 'wp_module_ecommerce'),
      'freeGift' => __('Free Gift', 'wp_module_ecommerce'),
      'inCart' => __('in Cart', 'wp_module_ecommerce'),
      'frequently' => __('Frequently', 'wp_module_ecommerce'),
      'boughtTogether' => __('Bought Together', 'wp_module_ecommerce'),

	);
	wp_localize_script('nfd_promotion_product_data', 'promotionData', $Promotion_data);
	}

	/**
	 * change icon for a Custom tab (Promotions tab) button added below Advance tab
	 */
	function action_admin_head() {
		echo '<style>
				#woocommerce-product-data ul.wc-tabs li.custom_tab_options a::before {
					content: "\f323";
				} 
		</style>';
	}

	public function custom_payment_gateways_order() {
		$array_data = array("pre_install_woocommerce_payments_promotion" => 2,
		"yith_paypal_payments" => 0,
		"element" => 1
	);
		update_option('woocommerce_gateway_order', $array_data);
	}  

	public function dismiss_woo_payments_cta() {
		$is_dismissed = get_option( 'wcpay_welcome_page_incentives_dismissed');
		if (!is_array($is_dismissed) || empty($is_dismissed)) {
			update_option('wcpay_welcome_page_incentives_dismissed', array("wcpay-promo-2023-action-discount"));
		}
	}

	public function disable_creative_mail_banner() {
		$is_dismissed = get_option( 'ce4wp_ignore_review_notice');
		if (!is_array($is_dismissed) || empty($is_dismissed)) {
			update_option('ce4wp_ignore_review_notice', true);
		}
	}
	
}
