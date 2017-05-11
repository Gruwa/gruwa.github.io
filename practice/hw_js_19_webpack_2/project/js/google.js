module.exports = function google() {
    $(function () {
        'use strict';
      (function() {
        var cx = '012577494148929298528:dq_ytgguf-c';
        var gcse = document.createElement('script');
        gcse.type = 'text/javascript';
        gcse.async = true;
        gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
        var s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(gcse, s);        
      })();
    });
};
