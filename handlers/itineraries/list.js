async function listItineraries(req, res, next) {
  const user = req.user;
  try {
    const result = await user.related('itineraries').fetch();
    res.send(result);
  } catch(error) {
    next(error);
  }
}

module.exports = listItineraries;