const Boom = require('boom');
const Itinerary = require('../../db/models/itinerary');

async function getItinerary(req, res, next) {
  const user = req.user;
  const itineraryId = req.params.id;

  try {
    const itinerary = await Itinerary.forge({ id: itineraryId, user_id: user.id }).fetch({ require: true });
    res.send(itinerary);
  } catch(error) {
    if(error instanceof Itinerary.NotFoundError) {
      next(Boom.notFound('Itinerary does not exist.'));
    }
    next(error);
  }
}

module.exports = getItinerary;