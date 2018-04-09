const request = require("request");

function get(url, callback) {
    request.get(url, (error, response, body) => {
        if (error) {
            return callback(error);
        }
        let json = JSON.parse(body);

        return callback(null, json[0].price_usd);
    });
}

module.exports.get = get; 