import style from './Login.module.css';
import Input from '../../components/Input/Input';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { loginUser } from '../../services/api';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const handleInputChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await loginUser(userData.email, userData.password);
      login(response);
      navigate('/profile');
    }catch(error){
      setError('Erro ao fazer login! Verifique suas credenciais!');
    }
  };

  return (
    <>
      <section className={style.main}>
        <h1>Login</h1>
        <p>Não possui conta ? <Link to='/'>Registre-se</Link></p>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <Input  
            type='email' 
            label='Email' 
            value={loginUser.email} 
            onChange={(value) => handleInputChange('email', value)}
            placeholder='Email'  
          />
          <Input 
            type='password' 
            label='Senha' 
            value={loginUser.password} 
            onChange={(value) => handleInputChange('password', value)}
            placeholder='Senha'  
          />
          {error && <p className={style.error}>{error}</p>}
          <div className={style.buttonContainer}>
            <button className={style.button} type="submit">Login</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login;