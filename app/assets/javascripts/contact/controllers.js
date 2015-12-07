define([], function() {
    'use strict';

    /** Controls the index page */
    var ContactCtrl = function($scope, $http, playRoutes, ngTableParams, $filter, $location) {
        /* jshint ignore:start */
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {id: 'desc'}
        }, {
            total:0,
            getData: function($defer,  params) {
                playRoutes.controllers.ContactController.getContacts().get().then(function(response) {
                    $scope.tableParams.total(response.data.length);
                    $scope.data = response.data;
                    $scope.data = $filter('orderBy')($scope.data, params.orderBy());
                    $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        });
        /* jshint ignore:end */

        $scope.addContact = function(contact) {
            console.log('Add Event :' + contact.name);
            playRoutes.controllers.ContactController.addContact(contact.name, contact.phoneNumber, contact.mail,
                contact.mailSecondary, contact.title, contact.skype, contact.newsletters).post().then(function(response) {
                    $location.path("/contacts");
                });
        };
    };
    ContactCtrl.$inject = ['$scope', '$http', 'playRoutes', 'ngTableParams', '$filter', '$location'];

    return {
        ContactCtrl: ContactCtrl
    };
});
