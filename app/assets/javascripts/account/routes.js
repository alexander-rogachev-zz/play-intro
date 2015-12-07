define(['angular', './controllers', 'common', 'ng-table', 'angular-growl'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('account.routes', ['yourprefix.common', 'ngTable', 'angular-growl']);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/accounts',  {templateUrl: '/assets/javascripts/account/list.html', controller:controllers.AccountCtrl})
            .when('/addAccount',  {templateUrl: '/assets/javascripts/account/add.html', controller:controllers.AccountCtrl});
    }]);
    return mod;
});