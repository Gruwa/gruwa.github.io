$(function() {
    'use strict';

    window.ServerPhotoCallback = function($data) {
            var $html = $('#resultTenor').html();
            var $dataTmpl = {
                 $data: $data,
            };
            var $SearchContent = tmpl($html, $dataTmpl);
            $('#resultTenorIn').html('');
            $('#resultTenorIn').append($SearchContent);


    }

    $('form').submit(function(event) {
        event.preventDefault();
        var $value = $('#searchTenor').val();

        $.ajax({
            url: 'https://pixabay.com/api/',
            method: 'GET',
            dataType: 'jsonp',
            data: {
                key: '5069177-dbb9700ef5f333933be917c5e',
                q: $value,
                image_type: 'photo',
                callback: 'ServerPhotoCallback',
                per_page: '100'
            },


        });

    });

// start 16 домашка

function human() {
    this.name = 'Vasya';
    this.age = '47';
    this.sex = 'on the beach';
    this.stature = '150mm';
    this.weight = '1500kg';
}
function student() {
    this.study = 'Univercity';
    this.scholarship = '0,1 coin';
    this.watchFilms = function() {
        alert('Watch films');
    };
}
// или можно вынести отдельно в prototype
// student.prototype.watchFilms = function() {
//     alert('Watch films');
// }
function worker() {
    this.job = 'Tower keeper';
    this.salary = '10,5 coin';
    this.wantWork = function() {
        alert('Work, work, work');
    };
}
// или можно вынести отдельно в prototype
// worker.prototype.wantWork = function() {
//     alert('Work, work, work');
// }

student.prototype = new human();
worker.prototype = new student();

var newStudent =  new student();
var newWorker =  new worker();
console.log('newStudent', newStudent);
console.log('newWorker', newWorker);

// end 16 домашка

});
