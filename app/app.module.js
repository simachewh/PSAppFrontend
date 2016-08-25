angular
    .module("app.services", []);
angular
    .module("ps.routes", []);

angular.module("psApp", [
    "ngRoute",
    "app.services",
    "ps.routes"
]);

