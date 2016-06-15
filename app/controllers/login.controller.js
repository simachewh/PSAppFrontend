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
        vm.processing = false;
        vm.error = "";
        vm.user = {};
        vm.loginData = {};

        console.log("LoginController: vm.loggedIn", vm.loggedIn);
        // check to see if a user is logged in on every request
        $rootScope.$on('$routeChangeStart', function () {
            vm.loggedIn = Auth.isLoggedIn();

            // get user information on page load
            Auth.getUser()
                .then(function (data) {
                    vm.user = data.data;
                });
        });

        /**
         * Tries to log user in by calling the login method of Auth service.
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
         * Tries to log user out by calling the logout method of Auth service.
         */
        function doLogout() {
            Auth.logout();
            vm.user = "";
            $location.path("/login");
        };

    };
})();