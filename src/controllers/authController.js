const prisma = require('../database/prismaClient.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) 
      return res.status(401).json({ error: "Unauthorized "});
    
    const valid = bcrypt.compareSync(password, user.password);

    if (!valid)
      return res.status(401).json({ error: "Unauthorized "});

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.SECRET_JWT, { expiresIn: '2h' });

    res.status(200).json({ id: user.id, name: user.name, token: token });
  }catch(error){  
    res.status(500).json({ 'error': error.message });
  }
}

module.exports = { login };