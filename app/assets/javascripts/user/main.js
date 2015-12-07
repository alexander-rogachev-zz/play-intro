define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('yourprefix.user', ['ngRoute', 'user.routes']);
    mod.controller('UserCtrl', controllers.UserCtrl);
    return mod;
});
