'use strict'

let app = angular.module('app', [])

app.directive('foo', function() {
    // Сокращенный варинт
        // return function(scope, element, attrs) {
        //     console.log('this is my directive')
        // }
    // полный вариант директивы => ИСПОЛЬЗОВАТЬ ЕГО
    return {
        link: function(scope, element, attrs) {//это функция в директиве которая срабатывает тогда, когда дом уже отобразился на странице
            console.log('this is my directive')
            console.log('scope', scope)
            console.log('element', element)
            console.log('attrs', attrs)
            element.on('click', function() {
                if (element.text() === 'foo') {
                    element.text('bar')
                } else {
                    element.text('foo')
                }
            })
        }
    }
})

//-----------------------------------///-----------------
app.controller('main1Ctrl', function() {
    this.money1 = '1.22$'
    this.money2 = '$3.23'
    this.money3 = '7.92'
})

app.filter('moneyFilter', function() {
    return function(str) {
        console.log('str', str)
        let lastChar = str.slice(-1)
        let firstChar = str.slice(0, 1)
        let slicePart

        if (lastChar === '$') {
            slicePart = str.slice(0, str.length - 1)
            return '$' + slicePart
        } if (firstChar === '$') {
            return str
        }else {
            return '$' + str
        }
    }
})

//--------------------//-----------------------

app.directive('fooBar', function() {
    return {
        restrict: 'EACM', // рестрикт директивы говорит как будет отрабатываться директива через элемент (Е), класс (С), коментарий (М) или через атрибут (А)б по умолчанию !!!(ЕА)!!!
        link: function() {
            console.log('fooBar');
        }
    }
})

//----------------------------------//-------------------

app.directive('fooTree', function() {
    let bookmarks = [
        {
            id: 1,
            name: 'Angular'
        },
        {
            id: 2,
            name: 'Ember'
        },
        {
            id: 3,
            name: 'Noda'
        }
    ]
    return {
        template: '<div ng-repeat="bookmark in mybookmarks">{{bookmark.name}}</div>',
        link: function(scope, element, attrs) {
            console.log('fooTree')
            scope.name = 'Coca'
            scope.mybookmarks = bookmarks
        }
    }
})
