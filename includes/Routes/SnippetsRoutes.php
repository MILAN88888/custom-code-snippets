<?php
/**
 * Custom Code Snippets SnippetsRoutes class.
 *
 * @package  namespace CCSNPT\Routes\SnippetsRoutes
 *
 * @category SnippetsRoutes  Class.
 * @author CCSNPT@Milan.
 */

namespace CCSNPT\Routes;

use CCSNPT\Controllers\SnippetsController;

/**
 * Add Snippets Routes class.
 *
 * @since 1.0.0
 */
class SnippetsRoutes {

	/**
	 * Endpoint namespace.
	 *
	 * @var string
	 */
	protected $namespace = 'custom-code-snippets/';

	/**
	 * Route base.
	 *
	 * @var string
	 */
	protected $rest_base = 'snippets';
	/**
	 * Register routes.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->rest_base . '/save',
			array(
				'methods'             => 'POST',
				'callback'            => array( new SnippetsController(), 'save_snippets' ),
				'permission_callback' => array( __CLASS__, 'check_access_permissions' ),
			)
		);

	}
	/**
	 * Check if a given request has access to update a setting
	 *
	 * @param WP_REST_Request $request Full data about the request.
	 * 
	 * @return WP_Error|bool
	 */
	public static function check_access_permissions( $request ) {
		$nonce = $request->get_header( 'X-WP-Nonce' );
		// Nonce check.
		if ( ! wp_verify_nonce( $nonce, 'wp_rest' ) ) {
			return new \WP_Error(
				'rest_forbidden',
				esc_html__( 'You do not have permissions to perform this action.', 'custom-code-snippets' ),
				array( 'status' => 403 )
			);
		}
		// Capability check.
		if ( ! current_user_can( 'manage_options' ) ) {
			return new \WP_Error(
				'rest_forbidden',
				esc_html__( 'You are not allowed to access this resource.', 'custom-code-snippets' ),
				array( 'status' => 403 )
			);
		}

		return true;
	}

}
