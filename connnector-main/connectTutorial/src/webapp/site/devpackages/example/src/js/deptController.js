define(['underscore', 'core', './models/deptCollection', 'logger'], function (_, Core, DeptCollection, Logger) {
    'use strict';

   var DeptController = function(options) {
       _.bindAll(this);
       options = options || {};
       this.deptCollection = options.deptCollection || new DeptCollection();
       this.logger = options.logger || Logger;
       this.location = options.location || Core.Location;
   };

   _.extend(DeptController.prototype, {
       selectedDept: null,

       loadDepts: function() {
           this.deptCollection.fetch({
               error: function(model, response, options, error){ this.trigger('error', error); }.bind(this)
           });
       },
       selectDept: function(dept) {
           if (!this.deptCollection.length) { //collection not yet loaded
               this.deptCollection.once('sync', function () { this.selectDept(dept); }.bind(this));
               return;
           }

           if(typeof(dept) === 'string') {
               dept = this.deptCollection.get(dept);
           }
           if (!dept) return;

           this.selectedDept = dept;
           this.trigger("change:selectedDept", dept);
           this.logger.log('Selecting dept: ' + dept.id, Logger.VERBOSE);

           this.location.navigate('example/depts/' + dept.id);
       },
   });

   Core.Events.enableFor(DeptController.prototype);

   return DeptController;
});
