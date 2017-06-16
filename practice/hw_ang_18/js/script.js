let app = angular.module('app', [])
// 1. какнаписать тоже самое что в низу только через this?
// 2. почему полученный объект не сохраняется в наш объект на сервере в файл. Он все время будет висеть в памяти пр работе???
app.controller('workCtrl', function($http, $scope) {
    console.log('workCtrl');
    $http({
        method: 'GET',
        url: 'http://localhost:3001/books'
    }).then(function successCallback(result) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('success', result)
        $scope.books = result.data
        console.log(this.books);

    }, function errorCallback(error) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error')
    })

})

app.controller('mainCtrl', function($http, $scope) {
    console.log('mainCtrl');

    // ------
    // console.log('!', $http.get('http://localhost:3001'));
    // $http.get('http://localhost:3001')
    // .success(function(result) {
    //     console.log('success')
    // })
    // .error(function(error) {
    //     console.log('error')
    // })
    //---------------
    $http({
        method: 'GET',
        url: 'http://localhost:3001/books'
    }).then(function successCallback(result) {
        // this callback will be called asynchronously
        // when the response is available
        console.log('success', result)
        $scope.books = result.data
        console.log($scope.books);

    }, function errorCallback(error) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
        console.log('error')
    })
    $scope.addBook = function(book) {
        console.log(book);
        $http.post('http://localhost:3001/books', book)
        .then(function successCallback(result) {
            // this callback will be called asynchronously
            // when the response is available
            console.log('success saved', result)
            $scope.books.push(book) // добавляем кнашему списку книг новыую только что добавленную на серввер книгу
            $scope.book = null //чтобы очистить поле инпут от вводимой информации

        }, function errorCallback(error) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
            console.log('error in book in post')
        })
    }

})
