'use strict';
//Server start
let $ServerData =
{
id: 100,
data: [
        {
        id: 101,
        title: "Advanced Machinery Helps Improve Quality",
        month: 'Jan',
        day: 23,
        imageSrc: 'img/news1.jpg',
        author: 'cmsmasters',
        coments: 6,
        text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem."
        },
        {
        id: 102,
        title: "Powerful Techniques for Advanced Service",
        month: 'Jan',
        day: 21,
        imageSrc: 'img/news2.jpg',
        author: 'cmsmasters',
        coments: 3,
        text: "Cum sociis natoque penatibus et magnis dis parturient ontesmus. Pro vel nibh et elit mollis commodo et nec augueique Nemo enim ipsam voluptatem quia ptas sit aspernatur samomo enim ipsam voluptatem."
        }
    ]
};
let $server = JSON.stringify($ServerData);
    //Server end

module.exports = $server;
