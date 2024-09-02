import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3500'
});

export const createUser = async (name, email, password) => {
  try {
    if (name || email || password) {
      const response = await api.post('/register', { 
        'name': name, 
        'email': email, 
        'password': password
       });
      return response.data;
    }
  }catch(error){
    throw error.response?.data || 'Error ao cadastrar usuário.';
  }
};

export const login = async (email, password) => {
  try {
    const response = await api.post('/login', {
      'email': email,
      'password': password
    });
  
    return response.data;
  }catch(error) {
    throw error.response?.data || 'Error ao fazer login.'
  }
};