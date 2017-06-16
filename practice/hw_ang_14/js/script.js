'use strict'

let app = angular.module('app', [])

app.controller('mainCtrl', function() {
    this.posts = [
        {
            name: 'post about cat'
        },
        {
            name: 'post about dog'
        }
    ]
    this.getPosts = function() {
        return this.posts;
    }
    console.log(this.getPosts());
})

app.directive('fooHome', function() {
    return {
        link: function(scope, element, attrs) {
            console.log(scope)
        },
        scope: false, //значение по умолчанию, при нем скоуп директивы равен скоупу контроллера
        template: '<div ng-repeat="post in mainCtrl.getPosts()">{{post.name}}</div>'
    }
})
