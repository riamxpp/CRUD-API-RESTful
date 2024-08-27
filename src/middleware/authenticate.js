const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization)
      res.status(401).json('Unauthorized');

    const token = authorization.replace('Bearer ', '').trim();
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    if (!id) 
      res.status(401).json('Token invalid');

    return next();

  }catch(error) {
    res.status(401).send();
  }
}