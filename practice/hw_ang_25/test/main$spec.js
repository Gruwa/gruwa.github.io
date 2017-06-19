describe('playlist', function() {
    let playlist

    beforeEach(function() {
        module('app')

        inject(function(_playlist_) {
            playlist = _playlist_
            console.log(playlist);
        })
    })

    it('should get correct playlist name', function() {
        expect(playlist.name).toEqual('Metallica')
    })

    it('get list of tracks', function() {
        let tracks =  [
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
        expect(playlist.getTracks()).toEqual(tracks)
    })
})
