<?php
/**
 *  Menus class.
 *
 * @package  namespace CCSNPT\Menus
 *
 * @since 1.0.0
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
		add_menu_page( esc_html__( 'Custom Code Snippets', 'custom-code-snippets' ), esc_html__( 'Custom Code Snippets', 'custom-code-snippets' ), 'manage_options', 'custom-code-snippets', array( $this, 'main_page' ) );
	}

	/**
	 * Handles output of the reports page in admin.
	 */
	public function main_page() {
		if ( ! is_admin_bar_showing() ) {
			return;
		}
		if ( ! empty( $_GET['page'] ) && 'custom-code-snippets' === $_GET['page'] ) { //phpcs:ignore WordPress.Security.NonceVerification
			wp_enqueue_script( 'ccsnpt-script', Helper::plugin_url() . '/dist/main.js', array( 'wp-element', 'react', 'react-dom', 'wp-api-fetch', 'wp-i18n', 'wp-blocks' ), CCSNPT_VERSION, true );

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
