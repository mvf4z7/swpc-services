const Joi = require('joi');
const Boom = require('boom');
const Itinerary = require('../../db/models/itinerary');

const validation = {
  params: Joi.object({
    id: Joi.number().integer().positive().required(),
  }),
};

async function getItinerary(req, res, next) {
  const user = req.user;
  const itineraryId = req.params.id;

  try {
    const itinerary = await Itinerary.forge({ id: itineraryId, user_id: user.id }).fetch({ require: true });
    console.log(itinerary.serialize());
    res.send(itinerary);
  } catch(error) {
    if(error instanceof Itinerary.NotFoundError) {
      next(Boom.notFound('Itinerary does not exist.'));
    }
    next(error);
  }
}

module.exports = {
  handler: getItinerary,
  validation,
};