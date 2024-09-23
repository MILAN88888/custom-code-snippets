<?php
/**
 * Custom code plugin main class.
 *
 * @since 1.0.0
 *
 * @package CCSNPT
 */

namespace CCSNPT;

use CCSNPT\Controllers\Admin\MenusController;
use CCSNPT\Controllers\InitController;
use CCSNPT\Migration\Migration;
use CCSNPT\RestApi;
use CCSNPT\Traits\Singleton;

/**
 * CSSNTP setup.
 *
 * @since 1.0.0
 */
final class CCSNPT {

	use Singleton;

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'init', array( $this, 'load_plugin_textdomain' ) );
		add_filter( 'plugin_row_meta', array( $this, 'plugin_row_meta' ), 20, 2 );
		$this->includes();
	}

	/**
	 * Load Localization files.
	 *
	 * Note: the first-loaded translation file overrides any following ones if the same translation is present.
	 *
	 * @since 1.0.0
	 */
	public function load_plugin_textdomain() {
		$locale = is_admin() && function_exists( 'get_user_locale' ) ? get_user_locale() : get_locale();
		$locale = apply_filters( 'plugin_locale', $locale, 'custom-code-snippets' );

		unload_textdomain( 'custom-code-snippets' );
		load_textdomain( 'custom-code-snippets', WP_LANG_DIR . '/custom-code-snippets/custom-code-snippets-' . $locale . '.mo' );
		load_plugin_textdomain( 'custom-code-snippets', false, plugin_basename( __DIR__ ) . '/languages' );
	}

	/**
	 * Display row meta in the Plugins list table.
	 *
	 * @since 1.0.0
	 *
	 * @param  array  $plugin_meta Plugin Row Meta.
	 * @param  string $plugin_file Plugin Base file.
	 * @return array
	 */
	public function plugin_row_meta( $plugin_meta, $plugin_file ) {
		if ( plugin_basename( CCSNPT_PLUGIN_FILE ) === $plugin_file ) {
			$new_plugin_meta = array(
				'docs' => '<a href="' . esc_url( 'https://www.milanc.com.np/projects/custom-code-snippets' ) . '" aria-label="' . esc_attr__( 'View Docs', 'custom-code-snippets' ) . '">' . esc_html__( 'Docs', 'custom-code-snippets' ) . '</a>',
			);

			return array_merge( $plugin_meta, $new_plugin_meta );
		}

		return (array) $plugin_meta;
	}

	/**
	 * Func to load the files.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	private function includes() {
			MenusController::init();
			InitController::init();
			RestApi::init();
	}
}
