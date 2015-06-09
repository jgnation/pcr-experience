define(['core', './deptModel', 'require'], function (Core, DeptModel, require) {
    "use strict";

    return Core.Collection.extend({
        url: require.toUrl('../../../exampleData/departments.json'),
        model: DeptModel
    });
});

