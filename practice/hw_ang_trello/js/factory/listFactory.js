angular.module('app').factory('listFactory', function () {
    'use strict';
    let service = {};
    let lists = [
            {
                id: 1,
                listName: 'List1'
            },
            {
                id: 2,
                listName: 'List2'
            },
            {
                id: 3,
                listName: 'List3'
            },
            {
                id: 4,
                listName: 'List4'
            }
        ];

    service.getLists = function () {
        return lists;
    };

    service.addList = function(listName) {
        lists.push({
            id: _.uniqueId('list_'),
            listName: listName
        });
    };

    service.removeList = function (list) {
        _.pull(lists, list);
    };

    return service;
});
