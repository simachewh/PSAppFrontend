/**
 * Created by Simachew on 09-Aug-16.
 */

(function () {
  angular
      .module("app.services")
      .factory("workplaceFactory", ["$http", workplaceFactory]);

    function workplaceFactory($http) {
        var factory = {};
        factory.getOne = getOne;
        factory.getAll = getAll;
        factory.create = create;
        factory.update = update;
        factory.deleteOne = deleteOne;
        factory.getPaginated = getPaginated;

        return factory;

        function getOne(id) {
            return $http.get(apiRoot + "/workplaces/", id);
        };

        function getAll() {
            return $http.get(apiRoot + "/workplaces/");
        };

        function create(employeeData) {
            return $http.post(apiRoot + "/workplaces/", employeeData);
        };

        function update(id, employeeData) {
            return $http.put(apiRoot + "/workplaces/", id, employeeData);
        };

        function deleteOne(id) {
            return $http.delete(apiRoot + "/workplaces/", id);
        };

        function getPaginated(start, page, size) {

        };
    };
}());
