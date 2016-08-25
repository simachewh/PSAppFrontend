/**
 * Created by Simachew on 13-Jun-16.
 */

(function () {

    angular
        .module("psApp")
        .controller("LoginController", ["$rootScope", "$location", "Auth", LoginController]);

    /**
     *
     * @param $rootScope
     * @param $location
     * @param Auth
     * @constructor
     */
    function LoginController($rootScope, $location, Auth) {

        var vm = this;
        vm.loggedIn = Auth.isLoggedIn();
        vm.doLogin = doLogin;
        vm.doLogout = doLogout;
        vm.isActive = isActive;
        vm.processing = false;
        vm.error = "";
        vm.employee = {};
        vm.loginData = {};
        vm.logedUser = {};

        // check to see if an employee is logged in on every request. Leave this at the top.
        $rootScope.$on('$routeChangeStart', function () {
            vm.loggedIn = Auth.isLoggedIn();

            // get employee information on page load
            Auth.getEmployee()
                .success(function (data) {
                    console.log("Login controller: getting data...", data);
                    vm.employee = data.data;
                    vm.loggedUser = data;
                });
        });

        /**
         * Compares the location path to the view view's position.
         * @param viewLocation the location wheere the view is at.
         * @returns {boolean}
         */
        function isActive(viewLocation) {
            return viewLocation === $location.path();
        };

        /**
         * Tries to log employee in by calling the login method of Auth service.
         */
        function doLogin() {
            vm.processing = true;
            vm.error = "";

            Auth.login(vm.loginData.userName, vm.loginData.password)
                .success(function (data) {
                    vm.processing = false;

                    if (data.success) {
                        $location.path("/dashboard");
                    } else {
                        vm.error = data.message;
                    }
                });
        };

        /**
         * Tries to log employee out by calling the logout method of Auth service.
         */
        function doLogout() {
            Auth.logout();
            vm.employee = "";
            $location.path("/login");
        };

    };
})();