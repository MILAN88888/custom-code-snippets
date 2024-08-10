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

use CCSNPT\Models\Snippets;

/**
 * Add Snippets Routes class.
 *
 * @since 1.0.0
 */
class SnippetsController {
	/**
	 * Snippet model object.
	 *
	 * @var [object]
	 */
	protected $snippets;

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->snippets = new Snippets();
	}

	/**
	 * Validate the snippet data.
	 *
	 * @param array $params The array of input data.
	 *
	 * @return array $errors The array of validation error messages.
	 */
	protected function validate_snippet_data($params) {
		$errors = array();
		$title = isset($params['title']) ? sanitize_text_field($params['title']) : '';

		if (empty($title)) {
			$errors['title'] = esc_html__( 'Title is required.','custom-code-snippets' );
		} else if (!is_string($title) || strlen($title) > 255) {
			$errors['title'] = esc_hmtl__( 'Title must be a string and less than 255 characters.', 'custom-code-snippets' );
		}

		$codesnippet = isset($params['codesnippet']) ? serialize(sanitize_text_field($params['codesnippet'])):'';
		if (empty($codesnippet)) {
			$errors['codesnippet'] = esc_html__('Code snippet is required.', 'custom-code-snippets');
		} else if (!is_string($codesnippet)) {
			$errors['codesnippet'] =  esc_html__( 'Code snippet must be a string.', 'custom-code-snippets' );
		}

		$priority = isset($params['priority']) ? absint($params['priority']) : '';

		if (!is_int($priority)) {
			$errors['priority'] = esc_html__('Priority is required and must be an integer.', 'custom-code-snippets');
		} else if ($priority < 0) {
			$errors['priority'] = esc_html__('Priority must be a non-negative integer.', 'custom-code-snippets');
		}

		$description = isset($params['description']) ? sanitize_text_field($params['description']) : '';

		if (empty($description)) {
			$errors['description'] = esc_html__('Description is required.', 'custom-code-snippets');
		} elseif (isset($description) && !is_string($description)) {
			$errors['description'] = esc_html__('Description must be a string.', 'custom-code-snippets');
		}

		$tags = isset($params['tags']) ? sanitize_text_field($params['tags']) : '';

		if (isset($ptags) && !is_string($tags)) {
			$errors['tags'] = esc_html__('Tags must be a string.', 'custom-code-snippets');
		}
		$active = isset($params['active']) ? absint( $params['active'] ) : 0;

		$data = compact('title', 'codesnippet', 'priority', 'description', 'tags', 'active');

		return array('errors'=>$errors, 'data'=>$data);
	}

	/**
	 * Formating the save snippet data.
	 *
	 * @param [type] $request The request data.
	 *
	 * @return \WP_REST_Response The response object.
	 */
	public function save_snippets( $request ) {
		$params = $request->get_json_params();

		$validated_data = $this->validate_snippet_data($params);

		if (!empty($validated_data['errors'])) {
			return new \WP_REST_Response(
				array('message' => esc_html__('Validation failed. Please check the errors.', 'custom-code-snippets'), 'errors' => $validated_data['errors']),
				400
			);
		}

		$res = $this->snippets->save_snippets( $validated_data['data'] );

		return new \WP_REST_Response(
			array('message'=>$res ? esc_html__( 'Saved successfully!!', 'custom-code-snippets' )  : esc_html__( 'Save Failed!!', 'custom-code-snippets' )  ),
			200
		);
	}
}
