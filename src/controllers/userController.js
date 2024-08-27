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

const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await prisma.user.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });
    res.status(200).json(user)
  }catch(error) {
    res.status(400).json({ "error": error.message});
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.params;

    
    const user = await prisma.user.findUnique({ where: { id }});
    if(!user) 
      return res.status(404).json('User not found');

    if (user.id !== id)
      return res.status(403).json('Forbidden: You cannot acess this resource');

    let encryptPassword = password ? bcrypt.hashSync(password, 10): user.password;
    const changedUser = await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        name: name || user.name,
        email: email || user.email,
        password: encryptPassword,
      }
    });

    const { password: _, ...userWithOutPassword } = changedUser;
    
    res.status(200).json(userWithOutPassword);

  }catch(error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user)
      res.status(401).json('Unauthorization');

    const deletedUser = await prisma.user.delete({
      where: {
        id
      }
    });
    res.status(201).json('User deleted');

  }catch(error){
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser };