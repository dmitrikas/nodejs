//Modules
var config = require('config');
var getapi = require('./getapi');
var cexio = require('./cexio');

//Const
const coin_url = config.get("Coinmarket.url");
const coin_update_sec = config.get("Coinmarket.update_second");
const price_precision = config.get("price_precision");
const apiKey = config.get("Cexio.apiKey");
const apiSecret = config.get("Cexio.apiSecret");

//Variables
var btcPrice_coinmarket = 0;

//Get price from API
function getBTCPrice() {
    getapi.get(coin_url, function(err, price) {
        if (err) {
            console.log(err);
        }
        //store BTC price from coin market
        btcPrice_coinmarket = price;
    });
}

function checkPrices(err, cexio_price) {
    if (err) {
        console.log(err);
        return;
    }
    
    var dif_prices = 0;
    if (btcPrice_coinmarket > 0) {
        dif_prices = (cexio_price - btcPrice_coinmarket) / btcPrice_coinmarket * 100;
        //console.log((new Date).toLocaleTimeString() + ', cexio btc: ' + cexio_price + ', coin btc: ' + btcPrice_coinmarket + ', difference: ' + (dif_prices).toFixed(price_precision) + ' %');
        console.log((new Date).toLocaleTimeString() + ', difference: ' + (dif_prices).toFixed(price_precision) + ' %');
    }
}

//Set loop for get price every 10 second by default, should be configured in /config/default.json
setInterval(getBTCPrice, coin_update_sec * 1000);

//Set websocket
cexio.get(apiKey, apiSecret, checkPrices);