let app = angular.module('app', ['ngMockE2E'])

app.run( function($httpBackend) { // позволяет что-то делать сразу после запуска
    let books = [
      {
        name: 'AngularJS'
      },
      {
        name: 'EmberJS'
      },
      {
        name: 'ReactJS'
      }
    ]
    $httpBackend.whenGET('http://localhost:3001/books').respond(200, books)
    $httpBackend.whenPOST('http://localhost:3001/books').respond(function(method, url, data) {
        let result = JSON.parse(data)
        books.push(result)
        return [200, result]
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
