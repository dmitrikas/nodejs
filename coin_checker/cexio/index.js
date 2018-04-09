var CEXIO = require('cexio-api-node');
var coin_price = 0

function get(apiKey, apiSecret, callback) {
    const cexWS = new CEXIO(apiKey, apiSecret).ws;
    
    //Open connection
    cexWS.open();

    cexWS.on('open', function () {
        //console.log('WebSocket connected');
        //Subscribe for Public data
        cexWS.subscribeTick();
    });

    cexWS.on('message', function (msg) {
        if (msg.e === 'tick') {
            if (msg.data != undefined && msg.data.symbol1 != undefined)   { 
                if (msg.data.symbol1 == 'BTC' && msg.data.symbol2 == 'USD' && coin_price != msg.data.price) {
                    coin_price = msg.data.price;
                    callback(null, coin_price);
                }
            }
        }
        
        if (msg.e === 'ping') {
            cexWS.subscribeTick();
            cexWS.close();
        }
    });

    cexWS.on('error', function (error) {clearScreenDown
        callback(error);
    });

    cexWS.on('close', function () {
        console.log('WebSocket disconnected');
    });
}

module.exports.get = get;