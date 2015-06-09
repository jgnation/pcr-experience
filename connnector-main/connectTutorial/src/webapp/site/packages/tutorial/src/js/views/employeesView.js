define(['core', 'template!../../content/employeesView', '../models/departmentModel'],
       function(Core, EmployeesViewTemplate, DepartmentModel) {
    "use strict";

    return Core.View.extend({
        render: function(id) {
            if (id) {
                var departmentModel = new DepartmentModel({ id: id });
                departmentModel.fetch({
                    success: function() {
                        EmployeesViewTemplate.renderToView(this, { model: departmentModel.attributes });
                    }.bind(this),
                    error: function() {
                        alert('Failed to load department ID ' + id);
                    }
                });
            } else {
                // Display template without list of employees
                EmployeesViewTemplate.renderToView(this);
            }

            return this;
        }
    });
});