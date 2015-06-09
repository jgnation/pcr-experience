define(['core', './departmentModel'], function(Core, DepartmentModel) {
    "use strict";

    return Core.Collection.extend({
        model: DepartmentModel,
        url: '/rs/endpoint/departments/'
    });
});