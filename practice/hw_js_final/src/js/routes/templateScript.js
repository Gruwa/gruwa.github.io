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

module.exports = $templateScript;







// let $templateScript =
// '<%' + 'var $array = $data.data;' +
// 'for (let i = 0; i < $array.length; i++)' +
//  '{%>' +
//     '<div class="partners--template">' +
//         '<div class="partners--photo">' +
//             '<div class="partners--embl"></div>' +
//         '</div>' +
//         '<p class="partners--name"><%=$array[i].name%> <%=$array[i].surname%></p>' +
//         '<p class="partners--text"><%=$array[i].info%></p>' +
//     '</div>' +
//     "<%$('.partners--photo').css('background-image', 'url(%><%=$array[i].photo%><%)');%>" +
// "<%$('.partners--embl').css('background-image', 'url(%><%=$array[i].icon%><%)');%>" +
// "<%$('.partners--embl').css('background-color', '#%><%=$array[i].colorIcon%><%');%>" +
// '<%}%>';
//
// module.exports = $templateScript;

// let $templateScript =
// '<%' + 'var $array = $data.data;' +
// 'for (let i = 0; i < $array.length; i++)' +
//  '{%>' +
//     '<div class="partners--template">' +
//         '<div class="partners--photo">' +
//             '<div class="partners--embl"></div>' +
//         '</div>' +
//         '<p class="partners--name"><%=$array[i].name%> <%=$array[i].surname%></p>' +
//         '<p class="partners--text"><%=$array[i].info%></p>' +
//     '</div>' +
//     "<%document.getElementsByClassName('partners--photo')[i].style.backgroundImage = 'url(%><%=$array[i].photo%><%)';" +
//     "document.getElementsByClassName('partners--embl')[i].style.backgroundImage = 'url(%><%=$array[i].icon%><%)';" +
//     "document.getElementsByClassName('partners--embl')[i].style.backgroundColor = '#%><%=$array[i].colorIcon%><%';%>" +
// '<%}%>'
// ;
//
// module.exports = $templateScript;
