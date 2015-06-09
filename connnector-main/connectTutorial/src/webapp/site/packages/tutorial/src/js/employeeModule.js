define(['core', 'require', './views/mainView'], function (Core, req, MainView) {
    "use strict";

    return Core.Module.extend({
        
        initialize: function(){
            this.mainView = new MainView();
            this.$element.html(this.mainView.render().$element);
        },
        
        path: 'employees',
        
        icon: {
            className: 'icon-FPO_circle_filled',
            text: 'Employees'
        },

        routes: {
            '': 'home',
            'department/:id': 'showDepartment'
        },

        home: function () {
            this.mainView.showDepartment(null);
        },
        
        showDepartment: function(id){
            this.mainView.showDepartment(id);
        }
    });
});