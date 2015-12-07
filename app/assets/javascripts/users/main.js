define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('yourprefix.users', ['ngRoute', 'users.routes']);
    mod.controller('UsersCtrl', controllers.UsersCtrl);
    return mod;
});
