/**
 * Created by Simachew on 26-Jul-16.
 */

(function () {
    angular
        .module("app.services")
        .factory("itemFactory", ["$http", itemFactory]);
    
    function itemFactory($http) {
        var apiRoot = "http://localhost:1988/api.psdelivery";

        var factory = {};
        factory.getOne = getOne;
        factory.getAll = getAll;
        factory.create = create;
        factory.update = update;
        factory.deleteOne = deleteOne;
        factory.getPaginated = getPaginated;

        return factory;

        function getOne(id) {
            return $http.get(apiRoot + "/items/", id);
        };

        function getAll() {
            return $http.get(apiRoot + "/items/");
        };

        function create(itemData) {
            return $http.post(apiRoot + "/items/", itemData);
        };

        function update(id, itemData) {
            return $http.put(apiRoot + "/items/", id, itemData);
        };

        function deleteOne(id) {
            return $http.delete(apiRoot + "/items/", id);
        };

        function getPaginated(start, page, size) {

        };

    }
})();