define(['core'], function(Core) {
    "use strict";

    return Core.Model.extend({
        url: function() {
            return '/rs/endpoint/departments/' + this.id;
        }
    });
});