<?php
/**
 * ScriptStyleController class.
 *
 * @since 1.0.0
 * @package  namespace CCSNPT\Controller\Admin\ScriptStyleController
 */

namespace CCSNPT\Controllers\Admin;

use CCSNPT\Helper;
use CCSNPT\Traits\Singleton;

/**
 * ScriptStyleController class.
 *
 * @since 1.0.0
 */
class ScriptStyleController {

	use Singleton;

	/**
	 * Scripts.
	 *
	 * @since 1.0.0
	 *
	 * @var array
	 */
	private $scripts = array();

	/**
	 * Styles.
	 *
	 * @since 1.0.0
	 *
	 * @var array
	 */
	private $styles = array();

	/**
	 * Localized scripts.
	 *
	 * @var array
	 */
	private $localized_scripts = array();

	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$this->init_hooks();
	}

	/**
	 * Initialize hooks.
	 *
	 * @since 1.0.0
	 */
	private function init_hooks() {
		add_action( 'init', array( $this, 'after_wp_init' ) );
		add_action( 'init', array( $this, 'register_scripts_styles' ), 11 );
		add_action( 'admin_enqueue_scripts', array( $this, 'localize_admin_scripts' ) );
	}

	/**
	 * Get asset url.
	 *
	 * @since 1.0.0
	 * @param string  $filename Asset filename.
	 * @param boolean $dev Has dev url.
	 * @return string
	 */
	public static function get_asset_url( $filename, $dev = true ) {
		$path = plugins_url( 'dist/', CCSNPT_PLUGIN_FILE );

		if ( $dev && Helper::is_development() ) {
			$path = 'http://localhost:3000/dist/';
		}
		return apply_filters( 'ccsnpt_asset_url', $path . $filename );
	}

	/**
	 * After WP init.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function after_wp_init() {

		$this->scripts = array(
			'main' => array(
				'src'     => self::get_asset_url( 'main.js' ),
				'deps'    => array( 'wp-element', 'react', 'react-dom', 'wp-api-fetch', 'wp-i18n', 'wp-blocks' ),
				'version' => CCSNPT_VERSION,
			),
		);

		$this->styles = array(
			'main' => array(
				'src'     => self::get_asset_url( 'main.css' ),
				'version' => CCSNPT_VERSION,
				'deps'    => array(),
			),
		);

		$this->scripts = apply_filters( 'ccsnpt_scripts', $this->scripts );
		$this->styles  = apply_filters( 'ccsnpt_styles', $this->styles );
	}

	/**
	 * Register scripts.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_scripts() {
		foreach ( $this->scripts as $handle => $script ) {
			wp_register_script( "ccsnpt-$handle", $script['src'], $script['deps'], $script['version'], true );
		}
	}

	/**
	 * Register styles.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function register_styles() {
		foreach ( $this->styles as $handle => $style ) {
			wp_register_style( "ccsnpt-$handle", $style['src'], $style['deps'], $style['version'] );
		}
	}

	/**
	 * Register scripts and styles for plugin.
	 *
	 * @since 1.0.0
	 */
	public function register_scripts_styles() {
		$this->register_scripts();
		$this->register_styles();
	}

	/**
	 * Localize block scripts.
	 *
	 * @return void
	 */
	public function localize_admin_scripts() {
		wp_localize_script(
			'ccsnpt-script',
			'ccsnpt_script_data',
			array(
				'adminURL'           => esc_url( admin_url() ),
				'siteURL'            => esc_url( home_url( '/' ) ),
				'ccsnptRestApiNonce' => wp_create_nonce( 'wp_rest' ),
				'rootApiUrl'         => esc_url_raw( rest_url() ),
				'restURL'            => rest_url(),
				'version'            => defined( 'CCSNPT_VERSION' ) ? CCSNPT_VERSION : '',
			)
		);
	}
}
