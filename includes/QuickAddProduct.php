<?php

namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\ModuleLoader\Container;

/**
 * Quick Add Product Class
 */
class QuickAddProduct
{
    /**
     * Holds the container object
     *
     * @var Container
     */
    protected $container;

    /**
     * Constructor
     *
     * @param  Container  $container  Plugin container
     */
    public function __construct(Container $container)
    {
        $this->container = $container;
    }

    /**
     * Initialize class hooks/filters
     *
     * @return void
     */
    public function init()
    {
        // Enable it only for Bluehost brand plugin.
        if ( 'bluehost' !== $this->container->plugin()->id ) {
            return;
        }

        // Enqueue scripts in admin.
        \add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
        // Register dashboard widget.
        \add_action( 'wp_dashboard_setup', array( $this, 'register_dashboard_widgets' ) );
        // Register API routes.
        \add_action( 'rest_api_init', array( $this, 'register_routes' ) );
    }


    /**
     * Enqueue scripts
     *
     * @return void
     */
    public function enqueue_scripts()
    {
        global $current_screen;

        $asset_file = NFD_ECOMMERCE_BUILD_DIR . 'quick-add-product/index.asset.php';
        if ( file_exists( $asset_file ) ) {
            $asset =  require $asset_file;

            // Register script.
            wp_register_script(
                'quick-add-product',
                NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/build/quick-add-product/index.js',
                array( 'accounting', ...$asset['dependencies'] ),
                $asset['version']
            );

            wp_localize_script(
                'quick-add-product',
                'quickAddProduct',
                array(
                    'errorMessage' => _x( '%s is a required field', 'Form error message. %s is the field name.', 'wp-module-ecommerce' ),
                    'productPlaceholderImage' => wc_placeholder_img_src(),
                    'money' => array(
                        'decimals' => wc_get_price_decimals(),
                        'thousandSeparator' => wc_get_price_thousand_separator(),
                        'decimalSeparator' => wc_get_price_decimal_separator(),
                        'currencySymbol' => get_woocommerce_currency_symbol(),
                    )
                )
            );

            wp_register_style(
                'quick-add-product',
                NFD_ECOMMERCE_PLUGIN_URL . 'vendor/newfold-labs/wp-module-ecommerce/build/quick-add-product/quick-add-product.css',
                array(),
                $asset['version']
            );

            // Maybe enqueue scripts
            if ( ! empty( $current_screen ) && in_array( $current_screen->id, array( 'dashboard', 'edit-product' ), true ) ) {

                wp_enqueue_global_styles_css_custom_properties();
                wp_enqueue_media();

                wp_enqueue_script( 'quick-add-product' );
                wp_enqueue_style( 'quick-add-product' );
            }
        }
    }

    /**
     * Register dashboard widget
     *
     * @return void
     */
    public function register_dashboard_widgets()
    {
        wp_add_dashboard_widget(
            'nfd_quick_add_product_widget',
            esc_html__( 'Quick Add Product', 'wp-module-ecommerce' ),
            array( $this, 'output_dashboard_widget' ),
            null,
            null,
            'column3',
            'high'
        );
    }

    /**
     * Output the dashboard widget
     *
     * @return void
     */
    public function output_dashboard_widget()
    {
        echo '<div id="nfd-quick-add-product-widget"></div>';
    }

    /**
     * Register create product API route
     *
     * @return void
     */
    public function register_routes()
    {
        (new \NewfoldLabs\WP\Module\ECommerce\RestApi\QuickAddProductController())->register_routes();
    }

    /**
     * Get a list of product categories
     *
     * @return array
     */
    protected function get_product_categories()
    {
        $categories = get_terms( array(
            'taxonomy' => 'product_cat',
            'hide_empty' => false,
        ) );

        if ( is_wp_error( $categories ) ) {
            return array();
        }

        return array_map(
            function ( $category ) {
                return array(
                    'id' => $category->term_id,
                    'name' => $category->name,
                );
            },
            $categories
        );
    }


}