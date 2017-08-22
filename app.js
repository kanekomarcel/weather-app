const yargs = require('yargs');

const geocode = require('./geocode/geocode');
const weather = require( './weather/weather');

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//console.log(argv);
//console.log(`Endereço codificado: ${encodeURIComponent(argv.address)}`);
geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address);
        var latitude = results.latitude;
        var longitude = results.longitude;
        weather.getWeather(latitude, longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}`);
            }
        });
    }
 });

//lt, lng, callback



//738711c5759e62fbd95edbf0ce147dd4