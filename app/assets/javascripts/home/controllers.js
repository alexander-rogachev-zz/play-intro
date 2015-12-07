/**
 * Home controllers.
 */
define([], function() {
  'use strict';

  /** Controls the index page */
  var HomeCtrl =  function ($scope, $http, Authenticated) {

      $scope.loginForm = {};

      $scope.login = function login() {
          Authenticated.login($scope.loginForm).then(function () {
              $scope.loginForm = {};
          }, function (error) {
              $scope.notif('error', 'Invalid username or password!');
          });
      };

      function get(endpoint) {
          return $http.get(endpoint).then(function (response) {
              $scope.notif('success', response.data);
          }, function (error) {
              // 401 and 403 errors are already handled by the interceptor
          });
      }


      $scope.notif = function notif(severity, message) {
          $scope.$emit('notification', severity, message);
      };
  };

  HomeCtrl.$inject = ['$scope', '$http', 'Authenticated'];

  return {
    HeaderCtrl: HeaderCtrl
  };

});
