let app = angular.module('app', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
    //   template: '<h1>This is my home page</h1>'
    templateUrl: 'html/home.html',
    // controller: 'homeCtrl'
    })
    .when('/work', {
      templateUrl: 'html/work.html',
      controller: 'workCtrl'
    })
    .when('/work/:postId', {
        // template: '<h1>This is my good work page</h1>'
        templateUrl: 'html/workPost.html',
        controller: 'workPostCtrl'
    })
    .otherwise({
        template: '404 no such page'
    })
})

app.controller('workCtrl', function($scope) {
    console.log('workCtrl');
    $scope.model = {
        message: 'GO HOME!!!'
    }
})

app.controller('workPostCtrl', function($scope, $routeParams) {
    console.log($routeParams.postId);
})
