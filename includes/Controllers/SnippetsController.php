<?php
/**
 * Custom Code Snippets SnippetsController class.
 *
 * @package  namespace CCSNPT\Controllers\SnippetsController
 *
 * @category SnippetsController  Class.
 * @author CCSNPT@Milan.
 */

namespace CCSNPT\Controllers;

/**
 * Add Snippets Routes class.
 *
 * @since 1.0.0
 */
class SnippetsController {

	/**
	 * Save the snippets.
	 *
	 * @param [type] $request The request data.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function save_snippets( $request ) {

		return new \WP_REST_Response(
			array('message'=>"Success"),
			200
		);
	}
}
