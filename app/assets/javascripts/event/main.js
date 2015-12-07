define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('yourprefix.event', ['ngRoute', 'event.routes']);
    mod.controller('EventCtrl', controllers.EventCtrl);
    return mod;
});
