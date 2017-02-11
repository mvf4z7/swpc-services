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
  // const formData = {
  //   ...options,
  //   ...staticOptions
  // };

  const formData = Object.assign({}, options, staticOptions);
  console.log(formData);

  let outboundFares = [];
  let returnFares = [];

  return osmosis
    .get(URL)
    // .log(console.log)
    .submit(FORM_SELECTOR, formData)
    .find(OUTBOUND_FARES_SELECTOR)
    // .log(console.log)
    .then( (priceMarkup) => {
      // const price = parsePriceMarkup(priceMarkup)
      // fares.outbound.push(price)
      console.log(priceMarkup);
      console.log(priceMarkup.toString());
      outboundFares = priceMarkup.toString();
    })
    .find(RETURN_FARES_SELECTOR)
    .then( (priceMarkup) => {
      // if (isOneWay) return // Only record return prices if it's a two-way flight
      // const price = parsePriceMarkup(priceMarkup)
      // fares.return.push(price)

      // if (!options.twoWayTrip) return;

      const matches = priceMarkup.toString().match(/\$.*?(\d+)/);
      console.log(parseInt(matches[1]));
      // returnFares = priceMarkup;
    });

}

const testInput = {
  twoWayTrip: true,
  originAirport: 'MDW',
  destinationAirport: 'LAX',
  outboundDateString: '02/09/2017',
  returnDateString: '02/012/2017',
  adultPassengerCount: 1
};

fetchPrices(testInput);

// osmosis
//   .get('https://www.google.com')
//   .log(console.log);
