define(['angular'], function(angular) {
    'use strict';

    var mod = angular.module('common.filters', []);

    mod.filter('property', function(value, property) {
        if (angular.isObject(value)) {
            if (value.hasOwnProperty(property)) {
                return value[property];
            }
        }
    });

    mod.filter('anyInvalidDirtyFields', function () {
        return function (form) {
            for (var prop in form) {
                if (form.hasOwnProperty(prop)) {
                    if (form[prop].$invalid && form[prop].$dirty) {
                        return true;
                    }
                }
            }
            return false;
        };
    });

    return mod;
});
