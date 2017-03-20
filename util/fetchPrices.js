const osmosis = require('osmosis');

const URL = 'https://www.southwest.com';
const FORM_SELECTOR = 'form#booking-form--flight-panel';
const OUTBOUND_FARES_SELECTOR = '#faresOutbound .product_price';
// const RETURN_FARES_SELECTOR = '#faresReturn .product_price';
const RETURN_FARES_SELECTOR = '#faresReturn .product_price, #b1Table span.var.h5';

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

  const outboundFares = [];
  const returnFares = [];

  return osmosis
    .get(URL)
    .submit(FORM_SELECTOR, formData)
    .find(OUTBOUND_FARES_SELECTOR)
    .then( (priceMarkup) => {
      // const matches = priceMarkup.toString().match(/\$.*?(\d+)/)
      // console.log(`0: ${matches[0]}   1: ${matches[1]} `);
      const price = parsePriceMarkup(priceMarkup);
      outboundFares.push(price);
      // console.log(typeof matches);
      // console.log(priceMarkup.toString());
    })
    .find(RETURN_FARES_SELECTOR)
    .then( (priceMarkup) => {
      if(!options.twoWayTrip) {
        return;
      }

      const price = parsePriceMarkup(priceMarkup);
      returnFares.push(price);
    })
    .done( () => {
      // console.log('outbound');
      // console.log(outboundFares.length);
      // console.log('\n\n\n\nreturn');
      console.log(returnFares.length);
      // returnFares.forEach(console.log);
    });

}

function parsePriceMarkup(markup) {
  const matches = markup.toString().match(/\$.*?(\d+)/);
  if(matches.length >= 2) {
    return matches[1];
  } else {
    return undefined;
  }
}

const testInput = {
  twoWayTrip: true,
  originAirport: 'MDW',
  destinationAirport: 'LAX',
  outboundDateString: '03/21/2017',
  returnDateString: '03/23/2017',
  adultPassengerCount: 1
};

fetchPrices(testInput);

// osmosis
//   .get('https://www.google.com')
//   .log(console.log);
