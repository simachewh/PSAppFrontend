/**
 * Created by Simachew on 14-Jun-16.
 */

(function () {

    angular
        .module("psApp")
        .config(intercept);

    function intercept($httpProvider) {

        $httpProvider.interceptors.push("AuthInterceptor");
    };


})();
