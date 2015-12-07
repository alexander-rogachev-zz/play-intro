define(['angular', './controllers', 'common', 'ng-table'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('contact.routes', ['yourprefix.common', 'ngTable']);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/contacts',  {templateUrl: '/assets/javascripts/contact/list.html', controller:controllers.ContactCtrl})
            .when('/addContact',  {templateUrl: '/assets/javascripts/contact/add.html', controller:controllers.ContactCtrl});
    }]);
    return mod;
});