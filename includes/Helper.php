<?php
/**
 * Custom Code Snippets Helper class.
 *
 * @package  namespace CCSNPT\Helper
 *
 * @since 1.0.0
 */

namespace CCSNPT;

/**
 * Helper methods for Wpeverest stmp.
 *
 * @since 1.0.0
 */
class Helper {
	/**
	 * Function to get the plugin url.
	 *
	 * @since 1.0.0
	 *
	 * @param  string $path Path.
	 */
	public static function plugin_url( $path = '/' ) {
		return untrailingslashit( plugins_url( $path, CCSNPT_PLUGIN_FILE ) );
	}
}
