/**
 * Created by Simachew on 12-Jun-16.
 */

(function () {

    angular
        .module("psApp")
        .controller("EmployeesController",
            ["employeeFactory", EmployeesController])
        .controller("EmployeeCreateController",
            ["employeeFactory", EmployeeCreateController])
        .controller("EmployeeEditController",
            ["$routeParams", "employeeFactory", EmployeeEditController]);

    /**
     *
     * @constructor
     * @param employeeFactory
     */
    function EmployeesController(employeeFactory) {
        var vm = this;
        vm.processing = true;
        vm.employees = {};
        vm.selectedIndex = 0;
        vm.selectedEmp;
        vm.select = select;
        vm.deleteEmployee = deleteEmployee;

        function select(emp, index) {
            vm.selectedIndex = index;
            vm.selectedEmp = emp;
        };

        /**
         * Grab all users on page load.
         */
        employeeFactory.getAll()
            .success(function (data) {
                //When all the employees are loaded remove processing variable.
                vm.processing = false;
                // bind employees that came back
                vm.employees = data;
            });

        /**
         * Controller method to delete an Employee.
         * todo: This should be moved to the edit controller, since deactivating an
         * employee data happens in the edit page.
         * @param id
         */
        function deleteEmployee(id) {
            vm.processing = true;
            employeeFactory.deleteEmployee(id)
                .success(function (data) {
                    /**
                     * todo:
                     * get all users to update the table you
                     * can also set up your api to return
                     * the list of users with the delete call
                     */
                    employeeFactory.getAll()
                        .success(function (data) {
                            vm.processing = false;
                            vm.employees = data;
                        });
                });
        };

    };

    /**
     *
     * @constructor
     * @param employeeFactory
     */
    function EmployeeCreateController(employeeFactory) {
        var self = this;


    };

    /**
     *
     * @param $routeParams
     * @constructor
     * @param employeeFactory
     */
    function EmployeeEditController($routeParams, employeeFactory) {

    };

})();
