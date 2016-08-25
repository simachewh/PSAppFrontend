/**
 * Created by Simachew on 14-Jun-16.
 */

(function () {

    angular
        .module("psApp")
        .config(["$httpProvider", accessTokenInterceptor]);

    function accessTokenInterceptor($httpProvider) {
        $httpProvider.interceptors.push("AuthInterceptor");
    };

}());
