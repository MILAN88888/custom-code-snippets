<?php
/**
 * Custom Code Snippets RestApi class.
 *
 * @package  namespace CCSNPT\RestApi
 */

namespace CCSNPT;

use CCSNPT\Routes\SnippetsRoutes;

/**
 * RestApi class.
 *
 * @since 1.0.0
 */
class RestApi {
	/**
	 * Rest api endpoints.
	 *
	 * @since 1.0.0
	 *
	 * @var array
	 */
	protected $route_classes = array();

	/**
	 * Hook into WordPress ready to init the REST API as needed.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public static function init() {
		add_action( 'rest_api_init', array( __CLASS__, 'register_rest_routes' ) );
	}

	/**
	 * Register REST API routes.
	 *
	 * @since 1.0.0
	 *
	 * @return void
	 */
	public static function register_rest_routes() {
		foreach ( self::get_route_classes() as $class_name ) {

			if ( class_exists( $class_name ) ) {
				$object = new $class_name();
				$object->register_routes();
			}
		}
	}

	/**
	 * List of classes routes.
	 *
	 * @since 1.0.0
	 * @static
	 *
	 * @return array
	 */
	protected static function get_route_classes() {
		return apply_filters(
			'ccsnpt_rest_api_get_rest_namespaces',
			array(
				'snippets' => SnippetsRoutes::class,
			)
		);
	}
}
