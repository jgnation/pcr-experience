define(['core', './departmentsView', './employeesView', 'template!../../content/mainView'],
        function(Core, DepartmentsView, EmployeesView, MainViewTemplate) {
    "use strict";

    return Core.View.extend({
        initialize: function() {
            this.departmentsView = new DepartmentsView();
            this.employeesView = new EmployeesView();
        },

        render: function() {
            MainViewTemplate.renderToView(this);
            this.$('#departments-view').html(this.departmentsView.render().$element);
            this.$('#employees-view').html(this.employeesView.render().$element);
            return this;
        },
        showDepartment: function(id) {
            this.employeesView.render(id);
        }
    });
});