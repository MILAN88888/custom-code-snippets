<?php
/**
 * Plugin Name: Custom Code Snippets
 * Plugin URI: https://milanc.com.np/custom-code-snippets
 * Description: Effortlessly user can add the block of code to code file.
 * Version: 1.0.0
 * Author: Milan
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

defined( 'ABSPATH' ) || exit;

// Include the autoload file for Composer dependencies.
if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
    require __DIR__ . '/vendor/autoload.php';
}
