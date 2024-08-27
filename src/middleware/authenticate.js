const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  try {
    const { authorization } = req.headers;
    const { userId } = req.params.id;
    
    if (!authorization)
      return res.status(401).json('Unauthorized');

    const token = authorization.replace('Bearer ', '').trim();
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    if (!id) 
      return res.status(401).json('Token invalid');

    if (userId !== id)
      return res.status(401).json('Unauthorized');

    return next();

  }catch(error) {
    res.status(401).send();
  }
}