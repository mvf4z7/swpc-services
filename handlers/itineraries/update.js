const _ = require('lodash');
const Itinerary = require('../../db/models/itinerary');
const Boom = require('boom');

const fields = [
  'two_way_trip',
  'origin_airport',
  'destination_airport',
  'outbound_date',
  'return_date',
  'adult_passenger_count',
];

// TODO: use Celebrate for validation

async function updateItinerary(req, res, next) {
  const userId = req.user.id;
  const itineraryId = parseInt(req.params.id, 10);
  const updates = _.pick(req.body, fields);
  const options = { 
    require: true,
    method: 'update',
    patch: true,
  };

  try {
    const result = await Itinerary
      .forge({ id: itineraryId, user_id: userId })
      .save(updates, options)
      .then( model => {
        return model.fetch();
      });
    res.send(result);
  } catch(error) {
    console.error
    if(error instanceof Itinerary.NoRowsUpdatedError) {
      next(Boom.badRequest('Invalid itinerary id'));
    }
    next(error);
  }
}

module.exports = {
  handler: updateItinerary,
  validation: {},
};
