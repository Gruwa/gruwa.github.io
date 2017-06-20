angular.module('app').factory('cardFactory', function () {
    let service = {};

    let cards = [
        {
            id: 1,
            description: 'Fix bug',
            list_id: 1
        },
        {
            id: 2,
            description: 'Learn Angular',
            list_id: 2
        },
        {
            id: 3,
            description: 'Test code',
            list_id: 3
        },
        {
            id: 4,
            description: 'Free time',
            list_id: 2
        },
    ];

    service.getCards = function (list) {
        return _.filter(cards, {list_id: list.id});
    };

    service.createCard = function (list, cardDescription) {
        cards.push({
            id: _.uniqueId('card_'),
            description: cardDescription,
            list_id: list.id
        });
    };

    service.deleteCard = function (card) {
        return _.pull(cards, card);
    };

    service.updateCard = function (updatingCard) {
        let card = _.find(cards, {id: updatingCard.id });
        card.description = updatingCard.description;
        card.list_id = updatingCard.list_id;
    };

    return service;
});
