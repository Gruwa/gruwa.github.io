let app = angular.module('app', ['ngRoute'])

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
    //   template: '<h1>This is my home page</h1>'
    templateUrl: 'html/home.html',
    controller: 'homeCtrl'
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
        template: '<h1>404 no such page</h1>'
    })
})

app.run(function($rootScope) {
    console.log('run');
    $rootScope.$on('$routeChangeStart', function(event, current, previous, reject) {
        console.log('changestart', arguments);
    })
    $rootScope.$on('$routeChangeSuccess', function(event, current, previous, reject) {
        console.log('changesuccess', arguments);
        $rootScope.currentPath = current.$$route.originalPath
    })
})

app.controller('pathCtrl', function() {
    console.log('pathCtrl');
})

app.controller('workCtrl', function($scope, postsFactory) {
    console.log('workCtrl');
    $scope.model = {
        message: 'GO HOME!!!'
    }
    $scope.posts = postsFactory
})

app.controller('homeCtrl', function($scope) {
    console.log('homeCtrl');
})

app.controller('workPostCtrl', function($scope, $routeParams, postsFactory) {
    console.log($routeParams.postId);
    let postId = Number($routeParams.postId) //приводим к числу айдишник полученный из строки, url-a
    $scope.post = _.find(postsFactory, {id:postId}) // ищем 1 элемент массива, для этого лодешем функцией _.findWhere в которую передается массив 1 параметром - где будем искать, вторым обект с ключем по которому будем искать
})

app.factory('postsFactory', function() {
    return [
        {
            id: 1,
            name: 'post about cat'
        },
        {
            id: 2,
            name: 'post about dog'
        },
        {
            id: 3,
            name: 'post about mouse'
        },
        {
            id: 4,
            name: 'post about tree'
        }
    ]
})
