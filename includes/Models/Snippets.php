<?php
/**
 * Custom Code Snippets Snippets class.
 *
 * @package  namespace CCSNPT\Controllers\Snippets
 *
 * @category Snippets  Class.
 * @author CCSNPT@Milan.
 */

namespace CCSNPT\Models;

/**
 * Snippets Model class.
 *
 * @since 1.0.0
 */
class Snippets {
	/**
	 * Save the snippet.
	 *
	 * @param [array] $data The snippet data.
	 *
	 * @return boolean
	 */
	public function save_snippets( $data ) {
		global $wpdb;

		return $wpdb->insert($wpdb->prefix.'ccsnpt_snippets', $data);
	}

	/**
	 * Get Snippets data.
	 *
	 * @param [array] $params The get params.
	 *
	 * @return array
	 */
	public function get_snippets( $params ) {
		global $wpdb;

		$sql = "SELECT * FROM {$wpdb->prefix}ccsnpt_snippets";
		return $wpdb->get_results($sql);
	}
}
