/**
 * Created by Simachew on 09-Aug-16.
 */

(function () {
    angular
        .module("psApp")
        .controller("WorkplaceController", ["workplaceFactory", WorkplaceController])
        .controller("WorkplaceCreateController", ["workplaceFactory", WorkplaceCreateController])
        .controller("WorkplaceEditConteoller", ["workplaceFactory", WorkplaceEditConteoller]);

    /**
     * Workplace controller. Controller for views showing list of workplaces.
     * @param workplaceFactory
     * @constructor
     */
    function WorkplaceController(workplaceFactory) {
        var vm = this;
        vm.processing = true;
        vm.workplaces = {};
        vm.deleteWorkplace = deleteWorkplace;

        workplaceFactory.getAll()
            .success(function (data) {
                vm.processing = false;

                vm.workplaces = data;
            });

        function deleteWorkplace(id) {

        };
    };
}());