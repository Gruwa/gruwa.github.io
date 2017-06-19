let app = angular.module('app', [])

app.directive('uiSource', function() {
    return {
        compile: function(elem) {
            let escape = function (content) {
                return content.replace(/\</g, '&lt;')
                            .replace(/\>/g, '&gt;')
            }
            let pre = angular.element('<pre class="prettyprint"></pre>')
            let pretty = prettyPrintOne(escape(elem.html()))
            pre.append(pretty)
            elem.replaceWith(pre)
        }
    }
})
