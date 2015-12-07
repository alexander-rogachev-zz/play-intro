define(['angular', './controllers', 'common', 'ng-table'], function(angular, controllers) {
    'use strict';

    var mod = angular.module('event.routes', ['yourprefix.common', 'ngTable']);
    mod.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/events',  {templateUrl: '/assets/javascripts/event/list.html', controller:controllers.EventCtrl})
            .when('/addEvent',  {templateUrl: '/assets/javascripts/event/add.html', controller:controllers.EventCtrl});
    }]);
    return mod;
});