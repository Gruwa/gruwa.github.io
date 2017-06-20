angular.module('app').controller('listCtrl', function (listFactory, cardFactory) {
    'use strict';

    console.log('listCtrl');
    this.removeList = function (list) {
        listFactory.removeList(list);
    };

    this.getCards = function (list) {
        return cardFactory.getCards(list);
    };

    this.createCard = function (list) {
        cardFactory.createCard(list, this.cardDescription);
        this.cardDescription = '';
    };
});
