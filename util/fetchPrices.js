const osmosis = require('osmosis');

const URL = 'https://www.southwest.com';
const FORM_SELECTOR = 'form#booking-form--flight-panel';
const OUTBOUND_FARES_SELECTOR = '#faresOutbound .product_price';
const RETURN_FARES_SELECTOR = '#faresReturn .product_price';

const staticOptions = {
  returnAirport: '',
  fareType: 'DOLLARS',
  seniorPassengerCount: 0,
  promoCode: '',
  submitButton: true,
  airTranRedirect: ''
};

/**
  * Available Options
  *
  * twoWayTrip: boolean, true if two-way, false if one-way
  * originAirport: string, airport code
  * destinationAirport: string, airport code
  * outboundDateString: string, format DD/MM/YYYY
  * returnDateString: string, format DD/MM/YYYY
  * adultPassengerCount: number, number of passengers
  *
  * returns:
*/

function fetchPrices(options) {
  const outboundFares = [];
  const returnFares = [];
  const formData = Object.assign({}, options, staticOptions);

  return new Promise( (resolve, reject) => {
    osmosis
      .get(URL)
      .submit(FORM_SELECTOR, formData)
      .then(function(context, data, next) {
        const outboundMarkup = context.find(OUTBOUND_FARES_SELECTOR);
        if(outboundMarkup.length === 0) {
          reject(new Error('No outbound markup found.'));
        }

        outboundMarkup.forEach( item => {
          const price = parsePriceMarkup(item);
          outboundFares.push(price)
          next(context, data);
        });

        if(options.twoWayTrip) {
          const returnMarkup = context.find(RETURN_FARES_SELECTOR);
          if(outboundMarkup.length === 0) {
            reject(new Error('No return markup found.'));
          }

          returnMarkup.forEach( item => {
            const price = parsePriceMarkup(item);
            returnFares.push(price);
            next(context, data);
          });
        }
      })
      .done( () => {
        resolve({
          outboundFares,
          returnFares
        });
      });
  });
}

function parsePriceMarkup(markup) {
  const matches = markup.toString().match(/\$.*?(\d+)/);
  if(matches.length >= 2) {
    return parseInt(matches[1]);
  } else {
    return undefined;
  }
}

const testInput = {
  twoWayTrip: true,
  originAirport: 'MDW',
  destinationAirport: 'LAX',
  outboundDateString: '04/03/2017',
  returnDateString: '05/04/2017',
  adultPassengerCount: 1
};

fetchPrices(testInput)
  .then( data => {
    console.log(data);
  })
  .catch( e => {
    console.error(e);
  });

