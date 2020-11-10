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
 * Block simple calculator renderer.
 *
 * @package     block_simple_calculator
 * @copyright   2020 A K M Safat Shahin <safatshahin@gmail.com>
 * @license     https://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

namespace block_simple_calculator\output;

defined('MOODLE_INTERNAL') || die;

class renderer extends \plugin_renderer_base {

    public function render_calculator() {
        $this->page->requires->css('/blocks/simple_calculator/style.css');
        $this->page->requires->js_call_amd('block_simple_calculator/simple_calculator', 'init', array());
        $data = array();
        return parent::render_from_template('block_simple_calculator/simple_calculator', $data);
    }
}
