$(function() {
'use strict'

var $menu = [
{
id: 100,
text: "Актуальное",
subMenu: [
        {
        id: 101,
        text: "Новости",
        class: "navlink",
        title: "Новости",
        href: "http://ichms13.ichms.org/ru/5/index5.html",
        },
        {
        id: 102,
        text: "Регистрация",
        class: "navlink",
        title: "Регистрация",
        href: "http://ichms13.ichms.org/ru/5/index5.html",
        },
        {
        id: 103,
        text: "Важная информация",
        class: "navlink",
        title: "Важная информация для участников ICHMS",
        href: "http://ichms13.ichms.org/ru/5/index5.html",
        },
        {
        id: 104,
        text: "Международный оргкомитет",
        class: "navlink",
        title: "Международный организационный комитет ICHMS",
        href: "http://ichms13.ichms.org/ru/5/index5.html",
        },
        {
        id: 105,
        text: "Программный оргкомитет",
        class: "navlink",
        title: "Программный организационный комитет ICHMS",
        href: "http://ichms13.ichms.org/ru/6/index6.html",
        },
        {
        id: 106,
        text: "Организаторы и спонсоры",
        class: "navlink",
        title: "Организаторы и спонсоры",
        href: "http://ichms13.ichms.org/ru/7/index7.html",
        },
    ]
},
{
id: 200,
text: "Конференции",
subMenu: [
        {
        id: 201,
        text: "ICHMS'97",
        class: "navlink",
        title: "ICHMS'97",
        href: "http://ichms97.ichms.org",
        },
        {
        id: 202,
        text: "ICHMS'99",
        class: "navlink",
        title: "ICHMS'99",
        href: "http://ichms99.ichms.org",
        },
        {
        id: 203,
        text: "ICHMS'01",
        class: "navlink",
        title: "ICHMS'01",
        href: "http://ichms01.ichms.org",
        },
        {
        id: 204,
        text: "ICHMS'03",
        class: "navlink",
        title: "ICHMS'03",
        href: "http://ichms03.ichms.org",
        },
        {
        id: 205,
        text: "ICHMS'05",
        class: "navlink",
        title: "ICHMS'05",
        href: "http://ichms05.ichms.org",
        },
        {
        id: 206,
        text: "ICHMS'07",
        class: "navlink",
        title: "ICHMS'07",
        href: "http://ichms07.ichms.org",
        },
        {
        id: 207,
        text: "ICHMS'09",
        class: "navlink",
        title: "ICHMS'09",
        href: "http://ichms09.ichms.org",
        },
        {
        id: 208,
        text: "ICHMS'11",
        class: "navlink",
        title: "ICHMS'11",
        href: "http://ichms11.ichms.org",
        },
        {
        id: 209,
        text: "ICHMS'13",
        class: "navlink",
        title: "ICHMS'13",
        href: "http://ichms13.ichms.org",
        },
        {
        id: 210,
        text: "ICHMS'15",
        class: "navlink",
        title: "ICHMS'15",
        href: "http://ichms15.ichms.org",
        },
    ]
},
];

var $html = $('#actual').html();
var $data = {
     $menu: $menu,
};
var $testContent = tmpl($html, $data);

$('header').find('#actualIn').append($testContent);
$('header').find('#actualIn650').append($testContent);


// $html = $('#conf').html();
//
// var $testContentConf = tmpl($html, $data);
//
// $('header').find('#confIn').append($testContentConf);

});
