if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js', {scope: '/'}) //option - можно указать в какой директории раблтать сервисворкеру, например /help/
        .then(function () {
            console.log('Serviceworker registered!');
        });
}

var promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('timeout done');
        reject({code: 500, message: "ERRROR"});
    }, 3000);
});

promise
    .then(
        (v) => {
            return v + "!!!"
        },
        (err) => {
            console.log(err.code, err.message);
        }).then((v) => {
    console.log(v);
});

promise
    .then(
        (v) => {
            return v + "!!!"
        })
    .then((v) => {
    console.log(v);
}).catch((err) => {
    console.log(err.code, err.message);
});

fetch('https://httpbin.org/ip')
    .then((v) => {
        console.log(v);
        return v.json();
    })
    .then((v) => {
        console.log(v);
    })
    .catch((err) => {
    console.log(err.code, err.message);
});

fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    // mode: 'no-cors',
    body: JSON.stringify({
        message: "WORK????"
    })
})
    .then((v) => {
        console.log(v);
        return v.json();
    })
    .then((v) => {
        console.log(v);
    })
    .catch((err) => {
        console.log(err.code, err.message);
    });


if(!window.Promise) {
    window.Promise = Promise;
}
