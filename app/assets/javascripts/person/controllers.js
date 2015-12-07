define([], function() {
    'use strict';

    /** Controls the index page */
    var PersonCtrl = function($scope, $http, playRoutes, ngTableParams, $filter, $location) {
        var persons = [{"id":1,"name":"fdf","age":34},{"id":2,"name":"erew","age":34},{"id":3,"name":"alex","age":30},{"id":4,"name":"alex","age":30},{"id":5,"name":"alex","age":30},{"id":6,"name":"alex","age":30},{"id":7,"name":"alex","age":30},{"id":8,"name":"alex","age":30},{"id":9,"name":"alex","age":30},{"id":10,"name":"alex","age":30},{"id":11,"name":"alex","age":30},{"id":12,"name":"alex","age":30},{"id":13,"name":"alex","age":30},{"id":14,"name":"alex","age":30},{"id":15,"name":"alex","age":30},{"id":16,"name":"alex","age":30},{"id":17,"name":"alex","age":30},{"id":18,"name":"alex","age":30},{"id":19,"name":"alex","age":30},{"id":20,"name":"alex","age":30},{"id":21,"name":"alex","age":30}];
        /* jshint ignore:start */
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {id: 'desc'}
        }, {
            total:0,
            getData: function($defer,  params) {
                var sortingField = Object.keys(params.sorting()).pop();
                console.log("sorting=" + sortingField);
                playRoutes.controllers.PersonController.getPersons().get().then(function(response) {
                    $scope.tableParams.total(response.data.length);
                    $scope.data = response.data;
                    $scope.data = $filter('orderBy')($scope.data, params.orderBy());
                    $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        });
        /* jshint ignore:end */

        $scope.addPerson = function(person) {
            console.log('Add Person :' + person.name);
            playRoutes.controllers.PersonController.addPerson(person.name, person.age).post().then(function(response) {
                console.log('response' + response);
                $location.path("/events");
                });
        };
    };
    PersonCtrl.$inject = ['$scope', '$http', 'playRoutes', 'ngTableParams', '$filter', '$location'];

    return {
        PersonCtrl: PersonCtrl
    };

});
