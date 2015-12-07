define(['angular', './controllers', 'common', 'ng-table'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('person.routes', ['yourprefix.common', 'ngTable']);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/persons',  {templateUrl: '/assets/javascripts/person/list.html', controller:controllers.PersonCtrl})
            .when('/addPerson',  {templateUrl: '/assets/javascripts/person/add.html', controller:controllers.PersonCtrl});
    }]);
    return mod;
});
