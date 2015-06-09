define(['core', 'require'], function (Core, require) {
    "use strict";

    var DeptModel = Core.Model.extend({
        url: function() {
            return require.toUrl('../../../exampleData/departments/' + this.id + '.json');
        }
    });

    return DeptModel;
});
