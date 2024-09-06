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

export const loginUser = async (email, password) => {
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

export const getUser = async (id, token) => {
  try {
    const response = await api.get(`/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    return response.data;
  }catch(error) {
    throw error.response?.data || 'Error ao buscar informações.';
  }
}