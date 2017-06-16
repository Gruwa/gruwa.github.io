'use strict'

let app = angular.module('app', [])

// подключение одного контроллера
// angular.module('app', []).controller('myCtrl', function($scope) {
//     $scope.hello = 55
//     $scope.home = registration
// })

// подключение нескольких контроллеров

app.controller('firstCtrl', function($scope, myFactory) {
    console.log('firstCtrl')
    $scope.myFactory = myFactory
    $scope.hello = 'hello world'
})

app.controller('secondCtrl', function($scope, myFactory) {
    console.log('secondCtrl')
    $scope.myFactory = myFactory
    $scope.hello = 'hello world'
})

app.factory('myFactory', function() {
    return {
        hello: 'hello world'
    }
})

// ----------------------

app.controller('thirdCtrl', function($scope, thirdFactory) {
    $scope.thirdFactory = thirdFactory

    $scope.hi = 'Hi world '
    $scope.getBookmark = function() {
        return 'my bookmark'
    }
    $scope.setHello = function(arg) {
        $scope.hi = arg
    }
})

app.factory('thirdFactory', function() {
    return {
        hello: function() {
            return 'Helooo all'
        }
    }
})

//-----------------------------------------

app.controller('myBooksCtrl', function($scope) {
    $scope.showBook = function() {
        console.log('This is some book');
    }
})

app.controller('angularBookCtrl', function($scope) {
    $scope.showBook = function() {
        console.log('This is angularJs book')
    }
})

app.controller('emberBookCtrl', function($scope) {

})

// ---------------------------------------------

app.controller('main01Ctrl', function() {
    this.myLesson = 'main Lesson'
    this.addLesson = function() {
        console.log('addLesson');
    }
})

app.controller('child01Ctrl', function() {
    this.myLesson = 'child lesson'
})

app.controller('child01_01Ctrl', function() {
    this.myLesson = 'child 01 lesson'
})
