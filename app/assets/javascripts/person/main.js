/**
 * Main, shows the start page and provides controllers for the header and the footer.
 * This the entry module which serves as an entry point so other modules only have to include a
 * single module.
 */
define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('yourprefix.person', ['ngRoute', 'person.routes']);
    mod.controller('PersonCtrl', controllers.PersonCtrl);
    return mod;
});
