let $templateScript =
'<%' + 'var $array = $data.data;' +
'for (let i = 0; i < $array.length; i++) {%>' +
    '<div class="partners--template">' +
        '<div class="partners--photo" style="background-image:url(<%=$array[i].photo%>)">' +
            '<div class="partners--embl" style="background-color:#<%=$array[i].colorIcon%>"><svg class="<%=$array[i].icon%>"><use xlink:href="#<%=$array[i].icon%>"></use></svg></div>' +
        '</div>' +
        '<p class="partners--name"><%=$array[i].name%> <%=$array[i].surname%></p>' +
        '<p class="partners--text"><%=$array[i].info%></p>' +
    '</div>' +
'<%}%>';

module.exports = $templateScript;
