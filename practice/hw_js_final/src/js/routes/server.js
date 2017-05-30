'use strict';
//Server start
let $ServerData =
{
id: 100,
data: [
        {
        id: 104,
        name: "Bradley",
        surname: "Hunter",
        photo: '../img/info--hunter__mobile.png',
        info: "Based in Chicago. I love playing tennis and loud music.",
        color: '4e73db',
        icon: '../img/Airplane.svg'
        },
        {
        id: 102,
        name: "Lucas",
        surname: "Marsha",
        photo: '../img/info--marsha__mobile.png',
        info: "I get my inspiration from nature and objects around me. I have a passion to colours, typography and skateboards.",
        color: 'ffa507',
        icon: '../img/flask.svg'
        },
        {
        id: 103,
        name: "Heather",
        surname: "Walker",
        photo: '../img/info--walker__mobile.png',
        info: "I'm a happy person that loves cats and climbing on mountains.",
        color: '1cd7ad',
        icon: '../img/cup.svg'
        },
        {
        id: 101,
        name: "Gogas",
        surname: "Hunter",
        photo: '../img/info--hunter2__mobile.png',
        info: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        color: 'ff4e50',
        icon: '../img/tv.svg'
        }
    ]
};
let $server = JSON.stringify($ServerData);
    //Server end

module.exports = $server;
