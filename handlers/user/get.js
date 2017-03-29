function getUser(req, res, next) {
  res.send(req.user);
}

module.exports = getUser;