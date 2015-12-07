define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('yourprefix.contact', ['ngRoute', 'contact.routes']);
    mod.controller('ContactCtrl', controllers.ContactCtrl);
    return mod;
});
