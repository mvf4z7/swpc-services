const _ = require('lodash');

const fields = [
  'two_way_trip',
  'origin_airport',
  'destination_airport',
  'outbound_date',
  'return_date',
  'adult_passenger_count',
];

// TODO: Put validation config in this file and export with handler as such:
// { handler: createItinerary, config: config }

async function createItinerary(req, res, next) {
  const user = req.user;
  const data = _.pick(req.body, fields);

  try {
    const result = await user.related('itineraries').create(data);
    res.send(result.attributes);
  } catch (error) {
    next(error);
  }
}

module.exports = createItinerary;