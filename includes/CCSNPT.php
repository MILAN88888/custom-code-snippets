<?php
/**
 * Custom code plugin main class.
 *
 * @since 1.0.0
 *
 * @package CCSNPT
 */

 namespace CCSNPT;

 use CCSNPT\Menus\Menus as Menus;

 /**
  * CSSNTP setup.
  *
  * @since 1.0.0
  */
class CCSNPT {
	/**
	 * The single instance of the class.
	 *
	 * @var Object
	 *
	 * @since 1.0.0
	 */
	protected static $instance = null;
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
	 * Main plugin class instance.
	 *
	 * @since 1.0.0
	 *
	 * @return object Main instance of the class.
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}

		return self::$instance;
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
		new Menus();
	}
}
