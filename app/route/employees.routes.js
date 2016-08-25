/**
 * Created by Simachew on 08-Aug-16.
 */

(function () {
  angular
      .module("ps.routes")
      .config(["$routeProvider", "$locationProvider",
        employeesRouteConfig]);

  function employeesRouteConfig($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/employees", {
          templateUrl: "../../views/pages/employees/employees.html",
          controller: "EmployeesController",
          controllerAs: "vm"
        })
        .when("/employees/new", {
          templateUrl: "../../views/pages/employees/ecreate.html",
          controller: "EmployeeCreateController",
          controllerAs: "vm"
        });
  };
}());
