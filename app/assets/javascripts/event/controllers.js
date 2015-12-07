define([], function() {
    'use strict';

    /** Controls the index page */
    var EventCtrl = function($scope, $http, playRoutes, ngTableParams, $filter, $location) {
        var eventTypes = [
            'PHONE_TO',
            'TRY',
            'EMAIL_TO',
            'VISIT_TO',
            'SMS_TO',
            'PHONEMEETING',
            'MEETING',
            'SALE',
            'PHONE_FROM',
            'EMAIL_FROM',
            'VISIT_FROM',
            'SMS_FROM',
            'SKYPE',
            'MAIL_TO',
            'MAIL_FROM',
            'NULL',
            'CALENDAR_MEETING',
            'CREATE_PHONEMEETING',
            'CREATE_MEETING'
        ];
        /* jshint ignore:start */
        $scope.tableParams = new ngTableParams({
            page: 1,
            count: 10,
            sorting: {id: 'desc'}
        }, {
            total:0,
            getData: function($defer,  params) {
                playRoutes.controllers.EventController.getEvents().get().then(function(response) {
                    $scope.tableParams.total(response.data.length);
                    $scope.data = response.data;
                    $scope.data = $filter('orderBy')($scope.data, params.orderBy());
                    $defer.resolve($scope.data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                });
            }
        });
        /* jshint ignore:end */

        $scope.addEvent = function(event) {
            console.log('Add Event :' + event.comment);
            playRoutes.controllers.EventController.addEvent(event.comment, event.eventType, event.startDate, event.endDate, event.calendar, event.duplicateToGoogleCalendar,
                event.isImportant, event.durationType).post().then(function(response) {
                    $location.path("/events");
            });
        };
    };
    EventCtrl.$inject = ['$scope', '$http', 'playRoutes', 'ngTableParams', '$filter', '$location'];

    return {
        EventCtrl: EventCtrl
    };
});
