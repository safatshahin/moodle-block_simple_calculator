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

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot . '/blocks/edit_form.php');

class block_simple_calculator_edit_form extends block_edit_form {
    /**
     * Form definition for this specific block.
     *
     * @param MoodleQuickForm $mform
     */
    protected function specific_definition($mform) {
        $displaymodeoptions = [
            block_simple_calculator::DISPLAYMODE_INLINE => get_string('displaymode_10', 'block_simple_calculator'),
            block_simple_calculator::DISPLAYMODE_POPUP => get_string('displaymode_20', 'block_simple_calculator'),
        ];
        $mform->addElement('select', 'config_displaymode', get_string('displaymode', 'block_simple_calculator'), $displaymodeoptions);
        $mform->setDefault('config_displaymode', block_simple_calculator::DISPLAYMODE_INLINE);
    }
}
