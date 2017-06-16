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

//=============================================

app.controller('main1Ctrl', function() {
    console.log('scope from ctrl', this)
    this.name = 'HArryy'

})

app.directive('fooTree', function() {
    return {
        scope: true,
        template: '<div>My name is {{name}} <input type="text" ng-model="name"></div>',
        link: function(scope, element, attrs) {
            scope.name = scope.main1Ctrl.name
            console.log('scope from directive', scope);
            console.log(scope.main1Ctrl.name)

        }
    }
})

//==============================//--------------------

app.controller('main2Ctrl', function() {
    this.name = 'Bobbby'
    this.color = '#333'
    this.reverse = function() {
        this.name = this.name.split('').reverse().join('')
    }
})

app.directive('wood', function() {
    return {
        scope: {
            name: '@', //получаем переменную из контроллера рид онли
            color: '=', //двухсторонний биндинг в контроллере и в директиве, т.е. при изменении значения меняется оно как в директиве так и в контроллере
            reverse: '&' // означет выполнить выражение из родительского контроллера
        },
        link: function(scope, element, attrs) {
            console.log('wood');
        },
        template: '<div>My name is {{name}} <input type="text" ng-model="name"></div>' +
        '<div>My color is {{color}} <input type="text" ng-model="color"></div>' +
        '<button ng-click="reverse()">Reverse</button>'
    }
})
// ==================================================================
app.directive('wrapIn', function($templateCache) {
    return {
        transclude: 'element', // позволяет делать трансклуд всей директивы сразу т.е. не содержание директивы, а полностью весь элемент, в отличии от transclude: true, который вкладывает только содержимое
        link: function(scope, element, attrs, ctrl, transclude) {
            let template = $templateCache.get(attrs.wrapIn)
            let templateElement = angular.element(template)
            transclude(scope, function(clone) {
                element.after(templateElement.append(clone))
            })
        }
    }
})
