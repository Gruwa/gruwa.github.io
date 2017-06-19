let app = angular.module('app', [])

app.factory('playlist', function() {
    let tracks = [
        {
            id: 1,
            name: 'Track 01'
        },
        {
            id: 2,
            name: 'Track 02'
        },
        {
            id: 3,
            name: 'Track 03'
        },
        {
            id: 4,
            name: 'Track 04'
        },
    ]
    return {
        name: 'Metallica',
        getTracks: function() {
            return tracks;
        }
    }
})
