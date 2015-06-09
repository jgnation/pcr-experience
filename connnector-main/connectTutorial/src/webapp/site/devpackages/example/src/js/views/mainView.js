define(['jquery', 'core', 'controls', 'underscore', './deptListView', './deptView', 'template!../../content/mainView'],
    function ($, Core, Controls, _, DeptListView, DeptView, MainTemplate) {
    "use strict";

        return Core.View.extend({
            controller: null,

            initialize: function () {
                this.controller = this.options.controller;

                this.deptView = new DeptView();
                this.deptListView = new DeptListView({collection: this.controller.deptCollection});

                this.listenTo(this.deptListView, 'change:selectedDept', this.onDeptSelected);
                this.listenTo(this.controller, 'change:selectedDept', this.deptListView.selectDept);
                this.listenTo(this.controller, 'change:selectedDept', this.deptView.render);
                this.listenTo(this.controller, 'error', this.onControllerError);

                this.$alertElement = $('<div/>').addClass('alert-container');
                this.alertContainer = new Controls.AlertContainer(this.$alertElement);

                this.controller.loadDepts();
            },

            onDeptSelected: function (dept) {
                this.controller.selectDept(dept);
            },

            onSelectedViewIdChanged: function (deptId) {
                this.deptListView.selectDept(deptId);
            },

            onControllerError: function(error){
                var alertOptions = {
                    message: error.message + " " + error.serverMessage,
                    type: 'error'
                };
                this.alertContainer.showAlert(alertOptions);
            },

            render: function () {
                MainTemplate.renderToView(this);
                this.$('.alert-container').replaceWith(this.$alertElement);
                this.$('#exampleDeptList').html(this.deptListView.render().$element);
                this.$('#exampleDept').html(this.deptView.render().$element);

                return this;
            }
        });
    }
);
