define(['angular', './controllers', 'common', 'ng-table'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('users.routes', ['yourprefix.common', 'ngTable']);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/users',  {templateUrl: '/assets/javascripts/users/list.html', controller:controllers.UsersCtrl});
    }]);
    return mod;
});