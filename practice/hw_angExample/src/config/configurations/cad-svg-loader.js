module.exports = function(content) {

  this.cacheable && this.cacheable();

  return `
    function appendSVGToBody(svgString) {   
      var svg = new DOMParser().parseFromString(svgString, 'image/svg+xml').documentElement;
    
      if (document.body) {
        if (document.body.childNodes[0]) {
          document.body.insertBefore(svg, document.body.childNodes[0]);
        } else {
          document.body.appendChild(svg);
        }
      }
    }
    
    function addSVG(content) {
      if (document.body) {
        appendSVGToBody(content);
      } else {
        document.addEventListener('DOMContentLoaded', function() {
          appendSVGToBody(content);
        }, false);
      }
    }
    
    module.exports = addSVG('${content}');
  `;
};
