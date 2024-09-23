<?php
/**
 * Plugin Name: Custom Code Snippets
 * Plugin URI: https://wordpress.org/plugins/custom-code-snippets
 * Description: Easily manage and execute custom code snippets in WordPress with the Custom Code Snippets plugin.
 * Version: 1.0.0
 * Author: CCSNPT@Milan
 * Author URI: https://milanc.com.np/
 * Text Domain: custom-code-snippets
 * Domain Path: /languages/
 * License: GNU General Public License v3.0
 * License URI: http://www.gnu.org/licenses/gpl-3.0.html
 * Requires at least: 5.2
 * Requires PHP: 7.4
 *
 * @package CustomCodeSnippets
 */

use CCSNPT\Migration\Migration;

defined( 'ABSPATH' ) || exit;

// Include the autoload file for Composer dependencies.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

// Define CCSNPT_VERSION.
if ( ! defined( 'CCSNPT_VERSION' ) ) {
	define( 'CCSNPT_VERSION', '1.0.0' );
}

// Define CCSNPT_PLUGIN_FILE.
if ( ! defined( 'CCSNPT_PLUGIN_FILE' ) ) {
	define( 'CCSNPT_PLUGIN_FILE', __FILE__ );
}

// Define CCSNPT_DIR.
if ( ! defined( 'CCSNPT_DIR' ) ) {
	define( 'CCSNPT_DIR', plugin_dir_path( __FILE__ ) );
}

// Define CCSNPT_DS.
if ( ! defined( 'CCSNPT_DS' ) ) {
	define( 'CCSNPT_DS', DIRECTORY_SEPARATOR );
}

// Define CCSNPT_URL.
if ( ! defined( 'CCSNPT_URL' ) ) {
	define( 'CCSNPT_URL', plugin_dir_url( __FILE__ ) );
}

/**
 * Initialization of CCSNPT.
 */
add_action( 'plugin_loaded', array( 'CCSNPT\CCSNPT', 'init' ) );

/**
 * Register activation hook.
 */
register_activation_hook(
	__FILE__,
	function () {
		Migration::init();
	}
);
