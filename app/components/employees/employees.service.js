/**
 * Created by Simachew on 15-Jun-16.
 */

(function () {

    angular
        .module("app.services")
        .factory("employeeFactory", ["$http", employeeFactory]);

    function employeeFactory($http) {
        var factory = {};
        var apiRoot = "http://localhost:1988/api.psdelivery";
        factory.getOne = getOne;
        factory.getAll = getAll;
        factory.create = create;
        factory.update = update;
        factory.deleteOne = deleteOne;
        factory.getPaginated = getPaginated;

        return factory;

        function getOne(id) {
            return $http.get(apiRoot + "/employees/", id);
        };

        function getAll() {
            return $http.get(apiRoot + "/employees/");
        };

        function create(employeeData) {
            return $http.post(apiRoot + "/employees/", employeeData);
        };

        function update(id, employeeData) {
            return $http.put(apiRoot + "/employees/", id, employeeData);
        };

        function deleteOne(id) {
            return $http.delete(apiRoot + "/employees/", id);
        };

        function getPaginated(start, page, size) {

        };

    }
})();