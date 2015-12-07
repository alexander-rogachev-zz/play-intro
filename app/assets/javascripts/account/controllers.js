/*define(['underscore'], function() {*/
define([], function() {
    'use strict';

    var AccountCtrl = function($scope, $http, playRoutes, ngTableParams, $filter, $location, growl) {
        /* jshint ignore:start */
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {id: 'desc'}
        }, {
            total:0,
            getData: function($defer,  params) {
                playRoutes.controllers.AccountController.getAccounts().get().then(function(response) {
                    $scope.tableParams.total(response.data.length);
                    $scope.data = response.data;
                    $scope.data = $filter('orderBy')($scope.data, params.orderBy());
                    $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        });
        /* jshint ignore:end */

        $scope.addAccount = function(account) {
            console.log('Add Account :' + account.name);
            playRoutes.controllers.AccountController.addAccount(account.name, account.defaultMailText, account.defaultMailSubject).post().then(function(response) {
                growl.success('Account ' + account.name + ' was created successfully.', {title: 'Successful!', ttl: 1500});
                $location.path("/accounts");
            });
        };

        $scope.resetRow = function (_, row, rowForm){
            row.isEditing = false;
            rowForm.$setPristine();
            $scope.tableTracker.untrack(row);
            return _.findWhere(originalData, function(r){
                return r.id === row.id;
            });
        };

        $scope.cancel = function (row, rowForm) {
            var originalRow = $scope.resetRow(row, rowForm);
            angular.extend(row, originalRow);
        };

        $scope.save = function (row, rowForm) {
            var originalRow = $scope.resetRow(row, rowForm);
            playRoutes.controllers.AccountController.updateAccount(row.id, row.name, row.defaultMailText, row.defaultMailSubject).post().then(function(response) {
                growl.success('Account ' + row.name + ' was updated successfully.', {title: 'Successful!', ttl: 1500});
                var index = $scope.tableParams.data.indexOf(row);
                $scope.tableParams.data.splice(index, 1);
                $scope.tableParams.reload();
            });
            angular.extend(originalRow, row);
        };

        $scope.del = function(row) {
            playRoutes.controllers.AccountController.removeAccount(row.id).post().then(function(response) {
                growl.success('Account ' + row.name + ' was deleted successfully.', {title: 'Successful!', ttl: 1500});
                var index = $scope.tableParams.data.indexOf(row);
                $scope.tableParams.data.splice(index, 1);
                $scope.tableParams.reload();
            });
        };
    };
    AccountCtrl.$inject = ['$scope', '$http', 'playRoutes', 'ngTableParams', '$filter', '$location', 'growl'];

    /*var demoTrackedTable = function () {
        return {
            restrict: "A",
            priority: -1,
            require: "ngForm",
            controller: demoTrackedTableController
        };
    };
    demoTrackedTable.$inject = [];

    var demoTrackedTableController = function($scope, $parse, $attrs, $element) {
        var self = this;
        var tableForm = $element.controller("form");
        var dirtyCellsByRow = [];
        var invalidCellsByRow = [];

        init();

        ////////

        self.init = function () {
            var setter = $parse($attrs.demoTrackedTable).assign;
            setter($scope, self);
            $scope.$on("$destroy", function() {
                setter(null);
            });

            self.reset = reset;
        };

        self.getCellsForRow = function (row, cellsByRow) {
            return _.find(cellsByRow, function(entry) {
                return entry.row === row;
            });
        };

        self.isCellDirty = function (row, cell) {
            var rowCells = self.getCellsForRow(row, dirtyCellsByRow);
            return rowCells && rowCells.cells.indexOf(cell) !== -1;
        };

        self.reset = function () {
            dirtyCellsByRow = [];
            invalidCellsByRow = [];
            self.setInvalid(false);
        };

        self.setCellDirty = function (row, cell, isDirty) {
            self.setCellStatus(row, cell, isDirty, dirtyCellsByRow);
        };

        self.setCellInvalid = function (row, cell, isInvalid) {
            self.setCellStatus(row, cell, isInvalid, invalidCellsByRow);
            self.setInvalid(invalidCellsByRow.length > 0);
        };

        self.setCellStatus = function (row, cell, value, cellsByRow) {
            var rowCells = self.getCellsForRow(row, cellsByRow);
            if (!rowCells && !value) {
                return;
            }

            if (value) {
                if (!rowCells) {
                    rowCells = {
                        row: row,
                        cells: []
                    };
                    cellsByRow.push(rowCells);
                }
                if (rowCells.cells.indexOf(cell) === -1) {
                    rowCells.cells.push(cell);
                }
            } else {
                _.remove(rowCells.cells, function(item) {
                    return cell === item;
                });
                if (rowCells.cells.length === 0) {
                    _.remove(cellsByRow, function(item) {
                        return rowCells === item;
                    });
                }
            }
        };

        self.setInvalid = function (isInvalid) {
            self.$invalid = isInvalid;
            self.$valid = !isInvalid;
        };

        self.untrack = function (row) {
            _.remove(invalidCellsByRow, function(item) {
                return item.row === row;
            });
            _.remove(dirtyCellsByRow, function(item) {
                return item.row === row;
            });
            self.setInvalid(invalidCellsByRow.length > 0);
        };
    };

    demoTrackedTableController.$inject = ["$scope", "$parse", "$attrs", "$element"];

    var demoTrackedTableRow = function () {
        return {
            restrict: "A",
            priority: -1,
            require: ["^demoTrackedTable", "ngForm"],
            controller: demoTrackedTableRowController
        };
    };
    demoTrackedTableRow.$inject = [];

    var demoTrackedTableRowController = function ($attrs, $element, $parse, $scope) {
        var self = this;
        var row = $parse($attrs.demoTrackedTableRow)($scope);
        var rowFormCtrl = $element.controller("form");
        var trackedTableCtrl = $element.controller("demoTrackedTable");

        self.isCellDirty = function (cell) {
            return trackedTableCtrl.isCellDirty(row, cell);
        };

        self.setCellDirty = function (cell, isDirty) {
            trackedTableCtrl.setCellDirty(row, cell, isDirty);
        };

        self.setCellInvalid = function (cell, isInvalid) {
            trackedTableCtrl.setCellInvalid(row, cell, isInvalid);
        };
    };

    demoTrackedTableRowController.$inject = ["$attrs", "$element", "$parse", "$scope"];

    var demoTrackedTableCell = function () {
        return {
            restrict: "A",
            priority: -1,
            scope: true,
            require: ["^demoTrackedTableRow", "ngForm"],
            controller: demoTrackedTableCellController
        };
    };

    demoTrackedTableCell.$inject = [];

    var demoTrackedTableCellController = function ($attrs, $element, $scope) {
        var self = this;
        var cellFormCtrl = $element.controller("form");
        var cellName = cellFormCtrl.$name;
        var trackedTableRowCtrl = $element.controller("demoTrackedTableRow");

        if (trackedTableRowCtrl.isCellDirty(cellName)) {
            cellFormCtrl.$setDirty();
        } else {
            cellFormCtrl.$setPristine();
        }
        // note: we don't have to force setting validaty as angular will run validations
        // when we page back to a row that contains invalid data

        $scope.$watch(function() {
            return cellFormCtrl.$dirty;
        }, function(newValue, oldValue) {
            if (newValue === oldValue) return;

            trackedTableRowCtrl.setCellDirty(cellName, newValue);
        });

        $scope.$watch(function() {
            return cellFormCtrl.$invalid;
        }, function(newValue, oldValue) {
            if (newValue === oldValue) return;

            trackedTableRowCtrl.setCellInvalid(cellName, newValue);
        });
    };

    demoTrackedTableCellController.$inject = ["$attrs", "$element", "$scope"];*/

    return {
        AccountCtrl: AccountCtrl/*,
        demoTrackedTable: demoTrackedTable,
        demoTrackedTableController:demoTrackedTableController,
        demoTrackedTableRow:demoTrackedTableRow,
        demoTrackedTableRowController:demoTrackedTableRowController,
        demoTrackedTableCell: demoTrackedTableCell,
        demoTrackedTableCellController: demoTrackedTableCellController*/
    };
});
