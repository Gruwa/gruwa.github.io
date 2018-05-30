'use strict';
module.exports = function (app) {

    function addRoutesMethods(module, controllerName) {
        let path = '';
        if (controllerName)
            path = controllerName + '/';

        for (let route in module.get)
            app.route('/api/' + path + route)
                .get(module.get[route]);

        for (let route in module.post)
            app.route('/api/' + path + route)
                .post(module.post[route]);

        for (let route in module.put)
            app.route('/api/' + path + route)
                .put(module.put[route]);

        for (let route in module.delete)
            app.route('/api/' + path + route)
                .delete(module.delete[route]);
    }

    //Login
    addRoutesMethods(require('./controllers/login'));

    //Shifts
    addRoutesMethods(require('./controllers/shifts'), 'shifts');

};
