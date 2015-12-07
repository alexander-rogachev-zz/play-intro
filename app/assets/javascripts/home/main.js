/**
 * Main, shows the start page and provides controllers for the header and the footer.
 * This the entry module which serves as an entry point so other modules only have to include a
 * single module.
 */
define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('yourprefix.home', ['ngRoute', 'home.routes']);
    mod.controller('HeaderCtrl', controllers.HeaderCtrl);

    mod.config(['$provide', '$httpProvider', function ($provide, $httpProvider) {
        // Creating a new HTTP interceptor to serve two purposes
        // 1) Add the token inside the headers at every request from the client
        // 2) Detect authorization failures (status 401 or 403) and provide default notifications to the user
        $provide.factory('AuthenticationInterceptor', ['$q', '$rootScope', function ($q, $rootScope) {
            return {
                // Appending the token by reading it from the storage (localStorage by default)
                'request': function (config) {
                    var token = JWT.get();
                    if (token) {
                        config.headers['Authorization'] = token;
                    }
                    return config;
                },

                // Sending events for notification if we detect an authentification problem
                'responseError': function (rejection) {
                    if (rejection.status === 401) {
                        // User isn't authenticated
                        $rootScope.$emit('notification', 'warning', 'You need to be authenticated to access such API.');
                        $rootScope.logout();
                    } else if (rejection.status === 403) {
                        // User is authenticated but do not have permission to access this API
                        $rootScope.$emit('notification', 'warning', 'Sorry, you do not have access to this API... Maybe if your username was "admin"... who knows...');
                    }

                    return $q.reject(rejection);
                }
            }
        }]);

        // Add the interceptor
        $httpProvider.interceptors.push('AuthenticationInterceptor');
    }])

// Just some stuff to display notifications and the current user
    mod.run(['$rootScope', 'Authenticated', function ($rootScope, Authenticated) {
        $rootScope.$on('notification', function (e, severity, message) {
            $rootScope.notification = {severity: severity, message: message};
        });

        $rootScope.closeNotification = function closeNotification() {
            $rootScope.notification = null;
        };

        $rootScope.user = Authenticated.current
        $rootScope.logout = Authenticated.logout
    }])

// A singleton service to handle all authentification process
    mod.factory('Authenticated', ['$http', '$rootScope', function ($http, $rootScope) {
        var user = null;
        sync();

        // Function to read the token from the storage
        // and if present, assign it as the current authenticated user
        function sync() {
            var session = JWT.remember();
            user = session && session.claim && session.claim.user;
            $rootScope.authenticated = !!user;
        }

        // Send a login to the server...
        function login(data) {
            return $http.post('/api/login', data).then(function (response) {
                // If successful, read the new token from the header
                var token = response.headers("Authorization");
                var session = JWT.read(token);

                // Validate it just in case the server would have send something fishy
                if (JWT.validate(session)) {
                    // Save it in the storage so that we don't lose
                    // if the user refresh the page
                    JWT.keep(token);
                    // Synchronize if with the current session
                    sync();
                } else {
                    // If not valid, let's just logout
                    logout();
                }
            });
        }

        // The logout step doesn't need any HTTP request. After all, the server
        // doesn't keep anything about the user, it's fully stateless.
        // We just need to remove it from the storage and sync the current session.
        // It's immediate.
        function logout() {
            JWT.forget();
            sync();
        }

        // Test if a user is currently authenticated
        function isAuthenticated() {
            return !!user;
        }

        // Return the current user
        function current() {
            return user;
        }

        return {
            login: login,
            logout: logout,
            isAuthenticated: isAuthenticated,
            current: current
        };
    }]);
    return mod;
});
