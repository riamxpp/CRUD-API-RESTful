const prisma = require('../database/prismaClient.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async function(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization){
      return res.status(401).json('Unauthorized');
    }
    const token = authorization.replace('Bearer ', '').trim();
    const { id } = jwt.verify(token, process.env.SECRET_JWT);
    
    if (!id) 
      return res.status(401).json('Token invalid');

    const userFound = await prisma.user.findUnique({ where: { id }});
    
    if (!userFound) {
      return res.status(401).json({ error: 'Unauthorized'})
    }

    if (req.params.id && req.params.id !== id)
      return res.status(403).json({ error: 'Forbidden: You cannot acess this resource'});
    
    req.user = userFound;
    return next();

  }catch(error) {
    res.status(401).send();
  }
}
// 66f8b661-363d-4c10-a43b-a5f3a706731d