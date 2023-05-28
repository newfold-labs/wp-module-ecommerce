<?php
namespace NewfoldLabs\WP\Module\ECommerce\Data;

use NewfoldLabs\WP\Module\Installer\Permissions as InstallerPermissions;
use NewfoldLabs\WP\ModuleLoader\Container;

final class Runtime {
	/**
	 * Runtime data for ecommerce application
	 */
	public static function prepareData(Container $container) {
		return array(
			'site' => array (
				'url' => \get_site_url(),
				'install_token' => InstallerPermissions::rest_get_plugin_install_hash(),
			),
			'rest_url'   => \get_home_url() . '/index.php',
		);
	}

}
