define(['angular', 'home', 'person', 'event', 'contact', 'account', 'users'], function(angular) {
  'use strict';

  return angular.module('app', ['yourprefix.home', 'yourprefix.person', 'yourprefix.event', 'yourprefix.contact',
      'yourprefix.account', 'yourprefix.users']);
});
