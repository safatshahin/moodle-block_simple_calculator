<?php
// This file is part of Moodle - https://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License along with
// Moodle.  If not, see <https://www.gnu.org/licenses/>.

/**
 * Block simple calculator is defined here.
 *
 * @package     block_simple_calculator
 * @copyright   2020 A K M Safat Shahin <safatshahin@gmail.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */


class block_simple_calculator extends block_base {
    const DISPLAYMODE_INLINE = 10;
    const DISPLAYMODE_POPUP = 20;

    /**
     * Initializes class member variables.
     */
    public function init() {
        // Needed by Moodle to differentiate between blocks.
        $this->title = get_string('pluginname', 'block_simple_calculator');
    }

    /**
     * Can you configure this block?
     *
     * @return bool
     */
    public function instance_allow_config() {
        return true;
    }

    /**
     * Initialise any JavaScript required by this block.
     */
    public function get_required_javascript() {
        parent::get_required_javascript();

        $this->page->requires->js_call_amd('block_simple_calculator/simple_calculator', 'init', array());

        if (!empty($this->config->displaymode) && $this->config->displaymode == self::DISPLAYMODE_POPUP) {
            $this->page->requires->js_call_amd('block_simple_calculator/calculatorpopup', 'init', array());
        }
    }

    /**
     * Returns the block contents.
     *
     * @return stdClass The block contents.
     */
    public function get_content() {

        if ($this->content !== null) {
            return $this->content;
        }
        $renderer = $this->page->get_renderer('block_simple_calculator');
        $this->content = new stdClass();
        $this->content->text = '';

        if (empty($this->config->displaymode) || $this->config->displaymode == self::DISPLAYMODE_INLINE) {
            $this->content->text .= $renderer->render_calculator();
        }

        return $this->content;
    }

    public function is_empty() {
        return parent::is_empty() && (!empty($this->config->displaymode) && $this->config->displaymode == self::DISPLAYMODE_POPUP);
    }

    /**
     * Defines configuration data.
     *
     * The function is called immediatly after init().
     */
    public function specialization() {

        // Load user defined title and make sure it's never empty.
        if (empty($this->config->title)) {
            $this->title = get_string('pluginname', 'block_simple_calculator');
        } else {
            $this->title = $this->config->title;
        }
    }

    /**
     * Allow multiple instances in a single course?
     *
     * @return bool True if multiple instances are allowed, false otherwise.
     */
    public function instance_allow_multiple() {
        return true;
    }

    /**
     * Sets the applicable formats for the block.
     *
     * @return string[] Array of pages and permissions.
     */
    public function applicable_formats() {
        return array('all' => true);
    }

    /**
     * Tests if this block has been implemented correctly.
     * Also, $errors isn't used right now
     *
     * @return boolean
     */
    public function _self_test() {
        return true;
    }
}
