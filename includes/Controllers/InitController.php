<?php
/**
 * Custom Code Snippets InitController class.
 *
 * @since 1.0.0
 *
 * @package  namespace CCSNPT\Controllers\InitController
 */

namespace CCSNPT\Controllers;

/**
 * Initial Controller class.
 *
 * @since 1.0.0
 */
class InitController {

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'wp_head', array( $this, 'load_snippets_at_header' ) );
		add_action( 'wp_footer', array( $this, 'load_snippets_at_footer' ) );
	}

	/**
	 * Load the snippets at header section.
	 *
	 * @return void
	 */
	public function load_snippets_at_header() {
		$this->print_active_snippets( 'header' );
	}

	/**
	 * Load the snippets at footer section.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function load_snippets_at_footer() {
		$this->print_active_snippets( 'footer' );
	}

	/**
	 * Print the active snippets.
	 *
	 * @param string $section The area where snippets need to print.
	 *
	 * @return void
	 */
	public function print_active_snippets( $section ) {
		$snippet_inst = new SnippetsController();
		$res          = $snippet_inst->get_active_snippets(
			array(
				'status' => 1,
				'scope'  => array( 'global', $section ),
			)
		);

		if ( ! isset( $res['results'] ) || empty( $res['results'] ) ) {
			return;
		}

		$snippets = $res['results'];
		foreach ( $snippets as $snippet ) {

			echo "\n", $snippet->codesnippet, "\n"; // phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped

		}
	}
}
