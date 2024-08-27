const prisma = require('../database/prismaClient.js');
const bcrypt = require('bcryptjs');

const createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const passEncrypt = bcrypt.hashSync(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passEncrypt,
      },
    });

    const { password: _, ...userWithOutPassword } = user;

    res.status(201).json(userWithOutPassword);
  }catch(error) {
    res.status(400).json({ 'error': error.message })
  };
}


module.exports = { createUser };