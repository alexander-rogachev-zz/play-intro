define([], function() {
    'use strict';

    /** Controls the index page */
    var UserCtrl = function($scope, $http, playRoutes, ngTableParams, $filter) {
        /* jshint ignore:start */
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {id: 'desc'}
        }, {
            total:0,
            getData: function($defer,  params) {
                playRoutes.controllers.UserController.getUsers().get().then(function(response) {
                    $scope.tableParams.total(response.data.length);
                    $scope.data = response.data;
                    $scope.data = $filter('orderBy')($scope.data, params.orderBy());
                    $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        });
        /* jshint ignore:end */
    };
    UserCtrl.$inject = ['$scope', '$http', 'playRoutes', 'ngTableParams', '$filter'];

    return {
        UserCtrl: UserCtrl
    };
});
