let $templateScript =
'<%' + 'var $array = $data.data;' +
'for (let i = 0; i < $array.length; i++) {%>' +
    '<div class="partners__template">' +
        '<div class="partners__photo" style="background-image:url(<%=$array[i].photo%>)">' +
            '<div class="partners__embl" style="background-color:#<%=$array[i].colorIcon%>"><svg class="<%=$array[i].icon%>"><use xlink:href="#<%=$array[i].icon%>"></use></svg></div>' +
        '</div>' +
        '<p class="partners__name"><%=$array[i].name%> <%=$array[i].surname%></p>' +
        '<p class="partners__text"><%=$array[i].info%></p>' +
    '</div>' +
'<%}%>';

module.exports = $templateScript;
