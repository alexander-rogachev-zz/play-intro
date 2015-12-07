define(['angular', './routes', './controllers'], function(angular, routes, controllers) {
    'use strict';

    var mod = angular.module('yourprefix.account', ['ngRoute', 'account.routes']);
    mod.controller('AccountCtrl', controllers.AccountCtrl);
   /* mod.controller('demoTrackedTableController', controllers.demoTrackedTableController);
    mod.controller('demoTrackedTableRowController', controllers.demoTrackedTableRowController);
    mod.controller('demoTrackedTableCellController', controllers.demoTrackedTableCellController);
    mod.directive('demoTrackedTable', controllers.demoTrackedTable);
    mod.directive('demoTrackedTableRow', controllers.demoTrackedTableRow);
    mod.directive('demoTrackedTableCell', controllers.demoTrackedTableCell);*/
    return mod;
});
