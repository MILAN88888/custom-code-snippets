<?php
/**
 *  Menus class.
 *
 * @since 1.0.0
 * @package CCSNPT\Menus
 * @category Menu
 * @author CCSNPT@Milan
 */

namespace CCSNPT\Menus;

use CCSNPT\Helper;

/**
 * Menus class.
 *
 * @since 1.0.0
 */
class Menus {
	/**
	 * Constructor.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu' ) );
	}
	/**
	 * Add menu items.
	 */
	public function add_menu() {
			$svg = '<svg enable-background="new 0 0 32 32" height="32px" id="svg2" version="1.1" viewBox="0 0 32 32" width="32px" xmlns="http://www.w3.org/2000/svg">
  <g id="sourcecode">
    <polygon points="22,22 22,26 32,16 22,6 22,10 28,16" fill="#FF0000"/>
    <polygon points="10,22 10,26 0,16 10,6 10,10 4,16" fill="#0000FF"/>
    <polygon points="10,20 14,20 22,12 18,12" fill="#00FF00"/>
  </g>
</svg>';
		$base64_svg = 'data:image/svg+xml;base64,' . base64_encode($svg); // phpcs:ignore
		add_menu_page( esc_html__( 'Custom Code Snippets', 'custom-code-snippets' ), esc_html__( 'Code Snippets', 'custom-code-snippets' ), 'manage_options', 'custom-code-snippets', array( $this, 'main_page' ), $base64_svg );
	}

	/**
	 * Handles output of the reports page in admin.
	 */
	public function main_page() {
		if ( ! is_admin_bar_showing() ) {
			return;
		}
		if ( ! empty( $_GET['page'] ) && 'custom-code-snippets' === $_GET['page'] ) { //phpcs:ignore WordPress.Security.NonceVerification
			wp_enqueue_style('ccsnpt-style', Helper::plugin_url() . '/build/styles.css', array(), CCSNPT_VERSION, 'all');
			wp_enqueue_script( 'ccsnpt-script', Helper::plugin_url() . '/build/index.js', array( 'wp-element', 'react', 'react-dom', 'wp-api-fetch', 'wp-i18n', 'wp-blocks' ), CCSNPT_VERSION, true );

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

				wp_localize_script(
					'ccsnpt-script',
					'_CCSNPT_',
					array()
				);

			ob_start();
			self::ccsnpt_body();
			self::ccsnpt_footer();
			exit;
		}
	}
	/**
	 * Page body content.
	 *
	 * @since 1.0.0
	 */
	public static function ccsnpt_body() {
		?>
			<body class="custom-code-snippets notranslate" translate="no">
				<div id="custom-code-snippets">Custom Code Snippets</div>
			</body>
		<?php
	}

	/**
	 * Page footer content.
	 *
	 * @since 1.0.0
	 */
	public static function ccsnpt_footer() {
		if ( function_exists( 'wp_print_media_templates' ) ) {
			wp_print_media_templates();
		}
		wp_print_footer_scripts();
		wp_print_scripts( 'ccsnpt-script' );
		?>
		</html>
		<?php
	}
}
