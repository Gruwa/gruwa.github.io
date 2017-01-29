
    // Set options
    var options = {
        offset: '#showHere',
        offsetSide: 'top',
        classes: {
            clone:   'banner--clone',
            stick:   'banner--stick',
            unstick: 'banner--unstick'
        }
    };

    // Initialise with options
    var banner = new Headhesive('.navigation', options) && new Headhesive('.navigation--650', options);

    // Headhesive destroy
    // banner.destroy();
