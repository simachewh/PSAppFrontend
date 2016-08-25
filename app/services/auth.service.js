/**
 * Created by Simachew on 13-Jun-16.
 */

(function () {

    angular
        .module("app.services")
        .factory("Auth", ["$http", "$q", "AuthToken", authManager])
        .factory("AuthToken", ["$window", tokenManager])
        /**
         * This interceptor factory will be pushed into the app config.
         */
        .factory("AuthInterceptor", ["$q", "$location", "AuthToken", authInterceptor]);

    /**
     * Manages user authentication. Logging in, logging out and retrieving
     * data of the user that's logged in.
     * @param $http injected to communicate with the api.
     * @param $q injected to return promise objects.
     * @param AuthToken to use access token.
     */
    function authManager($http, $q, AuthToken) {
        var authFactory = {};

        authFactory.login = login;
        authFactory.logout = logout;
        authFactory.isLoggedIn = isLoggedIn;
        authFactory.getEmployee = getEmployee;

        return authFactory;

        /**
         *
         * @param userName
         * @param password
         * @returns {*}
         */
        function login(userName, password) {

            //return the promise object and it's data.
            return $http.post("http://localhost:1988/api.psdelivery/authenticate",
                {
                    userName: userName,
                    password: password
                })
                .success(function (data) {
                    AuthToken.setToken(data.token);
                    return data;
                });
        };

        /**
         * Log user out. By removing the client's access token user is logged out.
         */
        function logout() {
            //clear the token
            AuthToken.setToken();
        };

        /**
         * Checks if a user is logged in or not. If an access token is
         * stored by the client then the client is logged in, otherwise not.
         * @returns {boolean}
         */
        function isLoggedIn() {
            if (AuthToken.getToken()) {
                return true;
            } else {
                return false;
            }
        };

        /**
         * Gets the logged employee from the server, if there is local token.
         * @returns {*}
         */
        function getEmployee() {
            if (AuthToken.getToken()) {
                return $http.get("http://localhost:1988/api.psdelivery/employees/me", {cache: true});
            } else {
                return $q.reject({message: "User has No access token"});
            }
        };

    };

    /**
     * Manages storing and retriving of an access token given to the user.
     * Access token is stored on the client's local storage on the window object.
     * @param $window window object injected to store token on client side.
     */
    function tokenManager($window) {
        var tokenManager = {};
        tokenManager.getToken = getToken;
        tokenManager.setToken = setToken;

        /**
         * Gets the user's token from the client's local storage.
         */
        function getToken() {
            return $window.localStorage.getItem("token");
        };

        /**
         * Stores the user's token on the client's local storage.
         * @param token
         */
        function setToken(token) {
            if (token) {
                $window.localStorage.setItem("token", token);
            } else {
                $window.localStorage.removeItem("token");
            }
        };

        return tokenManager;
    };

    /**
     * Configuration to attach access token into requests
     * @param $q used to return promise objects.
     * @param $location used to redirect user to other urls.
     * @param AuthToken token manager, to give access to the user's access token.
     */
    function authInterceptor($q, $location, AuthToken) {
        var interceptor = {};
        interceptor.request = onRequest;
        interceptor.responseError = onResponseError;

        return interceptor;

        /**
         * Happens on all requests going to the server.
         * @param config
         * @returns {*}
         */
        function onRequest(config) {
            var token = AuthToken.getToken();
            // if there is token add it to the request header.
            if (token) {
                config.headers["x-access-token"] = token;
            }

            return config;
        };

        /**
         * This happens on response errors.
         * @param response the response from the server.
         * @returns {*|Promise}
         */
        function onResponseError(response) {

            // If server returns 403, forbidden request, set the token empty
            //(which logs the user out) and redirect to login page.
            // todo: better asynchronous implementation.
            // http://www.webdeveasy.com/interceptors-in-angularjs-and-useful-examples/
            if (response.status == 403) {
                AuthToken.setToken();
                $location.path("/login");
            }
            // return the response as a promise.
            return $q.reject(response);
        }

    };

}());