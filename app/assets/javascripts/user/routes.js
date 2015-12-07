define(['angular', './controllers', 'common', 'ng-table'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('user.routes', ['yourprefix.common', 'ngTable']);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/users',  {templateUrl: '/assets/javascripts/user/list.html', controller:controllers.UserCtrl});
    }]);
    return mod;
});