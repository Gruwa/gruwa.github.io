let app = angular.module('app', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<h1>This is my home page</h1>'
    })
    .when('/work', {
      templateUrl: 'work.html',
      controller: 'workCtrl'
    })
})

app.controller('workCtrl', function($scope) {
    console.log('workCtrl');
    $scope.model = {
        message: 'GO HOME!!!'
    }
})
