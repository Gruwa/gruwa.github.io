'use strict';
gallery();
function gallery() {
    var body = document.body
    var divGallery = document.createElement('div');
    body.insertBefore(divGallery, body.lastChild);
    divGallery.style.maxWidth = '600px';
    divGallery.style.margin = '0px auto 0px auto';
    divGallery.style.backgroundColor = '#fff';
    var divBlock = document.createElement('div');
    divGallery.insertBefore(divBlock, divGallery.firstChild);
    divBlock.style.textAlign = 'center';
    var imgBig = document.createElement('img');
    divBlock.insertBefore(imgBig, divBlock.firstChild);
    imgBig.style.border = 'solid 1px #ccc';
    imgBig.style.maxWidth = '550px';
    imgBig.style.maxHeight = '400px';
    imgBig.style.padding = '5px';
    imgBig.style.margin = '5px';
    imgBig.alt = 'Large image';
    imgBig.src = 'https://js.cx/gallery/img1-lg.jpg';
    imgBig.id = 'largeImg';
    var divBlock2 = document.createElement('div');
    divGallery.insertBefore(divBlock2, divGallery.divBlock);
    divBlock2.classList.add('clearfix:after');
    var divBlock3 = document.createElement('div');
    divGallery.insertBefore(divBlock3, divGallery.divBlock2);
    var aImgSmall = document.createElement('a');
    divBlock2.insertBefore(aImgSmall, divBlock2.lastChild);
    aImgSmall.style.border = 'solid 1px #ccc';
    aImgSmall.style.width = '100px';
    aImgSmall.style.height = '100px';
    aImgSmall.style.padding = '3px';
    aImgSmall.style.margin = '2px';
    aImgSmall.style.display = 'block';
    aImgSmall.onmouseenter = function(){aImgSmall.style.borderColor = '#FF9900'};
    aImgSmall.onmouseleave = function(){aImgSmall.style.borderColor = '#ccc'};
    aImgSmall.href = 'https://js.cx/gallery/img1-lg.jpg';
    aImgSmall.style.cssFloat = 'left';
    var imgSmall = document.createElement('img');
    aImgSmall.insertBefore(imgSmall, aImgSmall.lastChild);
    imgSmall.src = 'https://js.cx/gallery/img1-thumb.jpg';
    imgSmall.alt = 'miniature';
    var imgBigList = ['https://js.cx/gallery/img1-lg.jpg', 'https://js.cx/gallery/img2-lg.jpg', 'https://js.cx/gallery/img3-lg.jpg', 'https://js.cx/gallery/img4-lg.jpg', 'https://js.cx/gallery/img5-lg.jpg', 'https://js.cx/gallery/img6-lg.jpg'];
    var imgSmallLinkList = ['https://js.cx/gallery/img1-thumb.jpg', 'https://js.cx/gallery/img2-thumb.jpg', 'https://js.cx/gallery/img3-thumb.jpg', 'https://js.cx/gallery/img4-thumb.jpg', 'https://js.cx/gallery/img5-thumb.jpg', 'https://js.cx/gallery/img6-thumb.jpg'];
    for (var i = 0; i < imgSmallLinkList.length; i++) {
        var aImgSmallClone = aImgSmall.cloneNode(true);
        divBlock2.insertBefore(aImgSmallClone, aImgSmall.nextSibling);
        imgSmall.src = imgSmallLinkList[i]; console.log(imgSmallLinkList[i]);
        aImgSmallClone.href = imgBigList[i]; console.log(imgBigList[i]);
    };


}



//
// function ListWorld() {
//     var newUl = document.createElement('ul');
//     document.body.insertBefore(newUl, document.body.firstChild);
//     for (var key in list) {
//         console.log(key);
//         var newLi = document.createElement('li');
//         newUl.insertBefore(newLi, newLi.nextSibling);
//         newLi.innerHTML = key;
//         console.log( key[i] );
//         // for (var key2 in key) {
//         //     console.log(key2);
//         //     var newLi = document.createElement('li');
//         //     newUl.insertBefore(newLi, newLi.nextSibling);
//         //     newLi.innerHTML = key2;
//         // }
//
//         // if (key != undefined) {
//
//
//         // } else {
//         //     return;
//         // }
//
//
// }
//
//
// }
//
// // var newUl = document.createElement('ul');
// // newUl.parentNode.insertBefore(newUl, newUl.nextSibling);

// var list = document.body.children[1];
// list.insertAdjacentHTML('beforeEnd', '<li>3</li><li>4</li><li>5</li>');


// var input = document.getElementById('hider');
//  input.addEventListener('click', klickButton);
//  function klickButton(){
//    var div = document.getElementById('text');
//    div.style.display = 'none';
//    input.removeEventListener('click', klickButton);
//  }

// var input = document.getElementById('hider');
//  input.addEventListener('click', klickButton);
//  function klickButton(){
//    input.style.display = 'none';
//    input.removeEventListener('click', klickButton);
//  }

// var button = document.querySelector('button');
//    var div = document.getElementsByClassName('pane');
//    for (var i = 0; i < div.length; i++) {
//        var button2 = button.cloneNode(true);
//        button2.style.position = "absolute";
//        button2.style.right = '5px';
//        button2.style.top = '5px';
//        button2.classList.add('button' + i);
//        div[i].appendChild(button2);
//        div[i].style.position = "relative";
//        var body = document.querySelector('body');
//        body.addEventListener('click', klickButton);
//        function klickButton(e){
//            var target = e.target;
//            if (target.tagName != 'BUTTON') return;
//            target.parentElement.style.display = 'none';
//            target.removeEventListener('click', klickButton);
//         }
//    };
//    button.style.display = 'none';
// [20:46:40 | Изменены 20:47:58] Oleg Zmijuk: <script>
// // ищем кнопку по классу, это более точно чем по button
// var removeButton = document.querySelector('.remove-button');
//
// // сразу задаём стили, которые будут в наших кнопках один раз,
// // чтоб не делать это в цикле 3 раза
// removeButton.style.position = "absolute";
// removeButton.style.right = '5px';
// removeButton.style.top = '5px';
//
// var paneList = document.getElementsByClassName('pane');
//
// // циклом вставляем кнопку в каждый блок
// for (var i = 0; i < paneList.length; i++) {
// var buttonCopy = removeButton.cloneNode(true);
// paneList[i].appendChild(buttonCopy);
// paneList[i].style.position = "relative";
// };
//
// removeButton.style.display = 'none';
//
// document.body.addEventListener('click', сlickButton);
//
// function сlickButton(e){
// var target = e.target;
// // если элемент это кнопка для удаления
// if (target.className === 'remove-button') {
// target.parentElement.style.display = 'none';
// target.removeEventListener('click', klickButton);
// };
// }
// </script>
// [20:46:45] Oleg Zmijuk: так будет более правильно
// //
