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
			$svg = '<svg width="800px" height="800px" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
	<title>custom-code-snippets</title>
	<g id="Layer_2" data-name="Layer 2">
		<g id="icons_Q2" data-name="icons Q2" fill="#27F5AE">
		<g>
			<path d="M41,6H7A2,2,0,0,0,5,8V32a2,2,0,0,0,2,2H41a2,2,0,0,0,2-2V8A2,2,0,0,0,41,6ZM21.4,24.6a1.9,1.9,0,0,1-.2,3,2,2,0,0,1-2.7-.3l-5.9-5.9a1.9,1.9,0,0,1,0-2.8l5.9-6a2.3,2.3,0,0,1,2.7-.3,2,2,0,0,1,.2,3.1L16.8,20Zm14-3.2-5.9,5.9a2,2,0,0,1-2.7.3,1.9,1.9,0,0,1-.2-3L31.2,20l-4.6-4.6a2,2,0,0,1,.2-3.1,2.3,2.3,0,0,1,2.7.3l5.9,6A1.9,1.9,0,0,1,35.4,21.4Z"/>
			<path d="M44,38H4a2,2,0,0,0,0,4H44a2,2,0,0,0,0-4Z"/>
		</g>
		</g>
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
