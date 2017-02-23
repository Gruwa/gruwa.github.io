'use strict';
thumbs.onclick = function(e) {
    var target = e.target; console.log(target);
    var a = target.getElementsByTagName('a');
    for (var i = 0; i < a.length; i++) {
        if (target.tagName != a[i] || target.tagName != a[i].firstElementChild) return;

    }

        console.log('l');
    // largeImg.src =
}
