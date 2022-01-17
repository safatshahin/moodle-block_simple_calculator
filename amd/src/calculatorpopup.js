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

define(
    ['jquery', 'core/templates', 'core/notification', 'core/modal_factory', 'core/modal_events', 'jqueryui'],
    function ($, templates, notification, ModalFactory, ModalEvents, jqueryui) {
        var calculatorpopup = {
            init: function () {
                var buttonpromise = templates.render('block_simple_calculator/popupbutton', {});
                buttonpromise.done(function (html) {
                    var container = $('#page-footer');
                    container.before(html);
                }).fail(notification.exception);

                $(document).keydown(function(e) {
                    if (e.key == 'Enter') {
                        e.key = '=';
                    }
                    $('[data-keybinding="' + e.key + '"]').trigger('click');
                });

                var calculatorpromise = templates.render('block_simple_calculator/simple_calculator', {});
                calculatorpromise.done(function (calculator) {
                    $(document).on('click', '#block-calculator-output-popupbutton', function () {
                        ModalFactory.create({
                            title: '',
                            body: calculator,
                            type: ModalFactory.types.DEFAULT,
                        }).then(function (modal) {
                            modal.show();

                            $(modal.getRoot()).draggable({
                                handle: ".modal-header"
                            });

                            modal.getRoot().on(ModalEvents.hidden, function() {
                                $('[data-keybinding="Delete"]').trigger('click'); // Reset calculator state.
                                modal.destroy();
                            });
                        });
                    });
                }).fail(notification.exception);
            },
        };
        return calculatorpopup;
    });
