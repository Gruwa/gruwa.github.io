let app = angular.module('app', [])

app.directive('uiSource', function() {
    return {
        compile: function(elem) {
            console.log(elem);
            let pre = angular.element('<pre class="prettyprint"></pre>')
            console.log(pre);
            let pretty = prettyPrintOne(elem.html())
            console.log(pretty);
        }
    }
})
