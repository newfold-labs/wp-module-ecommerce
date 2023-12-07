<?php
namespace NewfoldLabs\WP\Module\ECommerce;

use NewfoldLabs\WP\ModuleLoader\Container;
/**
 * WonderCart Integration Class
 */
class WonderCart {
	/**
	 * Holds the container object
	 *
	 * @var Container
	 */
	public $container;

	/**
	 * Constructor
	 *
	 * @param Container $container Plugin container
	 */
	public function __construct( Container $container ) {
		$this->container = $container;
	}

	/**
	 * Initialize WonderCart Integrations
	 *
	 * @return void
	 */
	public function init() {
		// For now these are only customized on Hostgator.
		// If in the future we need to expand this to other brands,
		// the brand checks could be moved into the individual methods.
		if ( $this->container->plugin()->id === 'hostgator' ) {
			add_filter( 'yith_sales_panel_page', array( $this, 'get_panel_page' ) );
			add_filter( 'yith_sales_main_panel_page', array( $this, 'get_main_panel_page' ) );
			add_filter( 'yith_sales_main_app_id', array( $this, 'get_main_app_id' ) );
			add_filter( 'yith_sales_get_scripts_data', array( $this, 'filter_scripts_data' ), 10, 2 );
		}
	}

	/**
	 * Returns the panel page
	 *
	 * @return string
	 */
	public function get_panel_page() {
		// Only for Hostgator
		return 'hostgator#/home/store/sales_discounts';
	}

	/**
	 * Returns the main panel page
	 *
	 * @return string
	 */
	public function get_main_panel_page() {
		// Only for Hostgator
		return 'hostgator';
	}

	/**
	 * Returns the main app ID
	 *
	 * @return string
	 */
	public function get_main_app_id() {
		// Only for Hostgator
		return '#hwa-app';
	}

	/**
	 * Modifies and returns the primary scripts data array to apply themeing
	 *
	 * @param array  $params Array of data being filtered
	 * @param string $handle The handle of the page in wp-admin where this is being loaded
	 * @return array The filtered array
	 */
	public function filter_scripts_data( $params, $handle ) {
		// Ensure we only apply this on the correct admin page
		if ( 'yith-sales-admin' === $handle ) {
			// Hostgator Branding
			$params['uiLibraryColors'] = array(
				'button'             => array(
					'borderRadius' => '6px',
					'contained'    => array(
						'background'               => '#2E93EE!important',
						'backgroundColor'          => '#2E93EE',
						'color'                    => '#fff!important',
						'&:hover'                  => array(
							'background'      => '#1F2044!important',
							'backgroundColor' => '#1F2044',
							'color'           => '#FFF!important',
						),
						'&:focus, &:focus-visible' => array(
							'boxShadow' => '0 0 0 1px #fff, 0 0 0 2px #2E93EE',
						),
						'&:disabled'               => array(
							'opacity'         => 1,
							'background'      => '#CDD8DF',
							'backgroundColor' => '#CDD8DF',
							'color'           => '#999',
						),
					),
					'outlined'     => array(
						'background'               => '#fff!important',
						'backgroundColor'          => '#fff',
						'color'                    => '#000!important',
						'border'                   => '1px solid #2E93EE',
						'&:hover'                  => array(
							'background'      => '#cadded!important',
							'backgroundColor' => '#cadded',
							'border'          => '#949fb2',
						),
						'&:focus, &:focus-visible' => array(
							'boxShadow' => '0 0 0 1px #fff, 0 0 0 2px #2E93EE',
						),
						'&:disabled'               => array(
							'opacity'         => 1,
							'background'      => '#fff',
							'backgroundColor' => '#fff',
							'border'          => '1px solid #949fb2',
							'color'           => '#999999',
						),
					),
				),
				'primary'            => '#2E93EE',
				'primaryHover'       => '#1F2044!important',
				'primaryHoverBorder' => '#2E93EE',
				'focusedBorderColor' => '#2E93EE!important',
				'success'            => '#348528',
				'tabs'               => array(
					'activeTab' => '#1f2044',
					'hoverTab'  => '#cdd8df',
				),
			);
		}
		return $params;
	}
}
