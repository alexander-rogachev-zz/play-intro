define(['angular'], function(angular) {
    'use strict';

    var mod = angular.module('common.directives.directives', []);
    /*mod.directive('strongPassRequired', function () {
        var isValid = function(s) {
            return s && s.length > 5 && /\D/.test(s) && /\d/.test(s);
        };

        return {
            require:'ngModel',
            link:function (scope, elm, attrs, ngModelCtrl) {

                ngModelCtrl.$parsers.unshift(function (viewValue) {
                    ngModelCtrl.$setValidity('account.name', isValid(viewValue));
                    return viewValue;
                });

                ngModelCtrl.$formatters.unshift(function (modelValue) {
                    ngModelCtrl.$setValidity('account.name', isValid(modelValue));
                    return modelValue;
                });
            }
        };
    });*/
    return mod;
});