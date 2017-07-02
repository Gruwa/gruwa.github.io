'use strict';

// Declare app level module which depends on views, and components
let eventsApp angular.module('eventsApp', []).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);
