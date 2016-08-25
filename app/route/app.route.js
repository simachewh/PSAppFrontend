/**
 * Created by Simachew on 13-Jun-16.
 */

(function () {

    angular
        .module("psApp")
        .config(routeConfig);

    function routeConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "../../views/pages/home.html"
            })
            .when("/login", {
                templateUrl: "../../views/pages/login.html",
                controller: "LoginController",
                controllerAs: "login"
            })
            .when("/dashboard", {
                templateUrl: "../../views/pages/dashboard.html"
            });

        $locationProvider.html5Mode(true);
    };
})();