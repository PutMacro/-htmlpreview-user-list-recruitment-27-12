export default function fetchJSON(url, params) {
    return new Promise((resolve, reject) => {
        params = Object.assign({
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            },
        }, params || {});

        fetch(url, params)
            .then(async resp => {
                let json = {};

                if (resp.status != 204) {
                    json = await resp.json();
                }

                if (resp.status >= 400) {
                    reject(json);
                } else {
                    resolve(json);
                }
            })
            .catch(err => {
                reject(err);
            });
    });
}