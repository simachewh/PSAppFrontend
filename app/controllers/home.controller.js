/**
 * Created by Simachew on 13-Jun-16.
 */

(function () {

    angular
        .module("psApp")
        .controller("HomeController", HomeController);
    /*
     HomeController.$inject(["$http", "$logger"]);
     */

    /**
     *
     * @param $http
     * @constructor
     */
    function HomeController($http) {

        var vm = this;
        vm.result = {};

        $http.get("http://localhost:1988")
            .success(function (result) {
                vm.result = result;
            })
            .error(function (data, status) {
                vm.result = data;
            });
    };
})();