/**
 * Created by Simachew on 26-Jul-16.
 */

(function () {
    angular
        .module("ps.routes")
        .config(["$routeProvider", "$locationProvider",
            itemsRouteConfig]);

    function itemsRouteConfig($routeProvider, $locationProvider) {
        $routeProvider
            .when("/items", {
                templateUrl: "../../views/pages/items/items.html",
                controller: "ItemsController",
                controllerAs: "vm"
            })
            .when("/items/new", {
                templateUrl: "../../views/pages/items/icreate.html"
            });
        $locationProvider.html5Mode(true);
    };
})();