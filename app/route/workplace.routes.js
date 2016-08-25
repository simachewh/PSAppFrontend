/**
 * Created by Simachew on 09-Aug-16.
 */

(function () {
    angular
        .module("ps.routes")
        .config(["$routeProvider", "$locationProvider", workplaceRouteConfig]);

    function workplaceRouteConfig($routeProvider, $locationProvider) {
        $locationProvider.html5Mode(true);
        $routeProvider
            .when("/workplaces", {
                templateUrl: "../../views/pages/workplaces/workplaces.html"
            });
    };
}());
