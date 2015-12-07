define(['angular', 'home', 'person', 'event', 'contact', 'account', 'user'], function(angular) {
  'use strict';

  return angular.module('app', ['yourprefix.home', 'yourprefix.person', 'yourprefix.event', 'yourprefix.contact',
      'yourprefix.account', 'yourprefix.user']);
});
