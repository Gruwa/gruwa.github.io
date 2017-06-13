    let $templateScript =
    '<%' + 'var $array = $data.data;' +
    'for (let i = 0; i < $array.length; i++) {%>' +
    '<div class="partners--template">' +
    '<div class="partners--photo" style="background-image:url(<%=$array[i].photo%>)">' +
    '<div class="partners--embl" style="background-image:url(<%=$array[i].icon%>);background-color:#<%=$array[i].colorIcon%>"></div>' +
    '</div>' +
    '<p class="partners--name"><%=$array[i].name%> <%=$array[i].surname%></p>' +
    '<p class="partners--text"><%=$array[i].info%></p>' +
    '</div>' +
    '<%}%>';
