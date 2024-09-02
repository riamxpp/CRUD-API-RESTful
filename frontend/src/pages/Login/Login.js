import style from './Login.module.css';
import Input from '../../components/Input/Input';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import { login } from '../../services/api';

const Login = () => {
  const [loginUser, setLoginUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleInputChange = (name, value) => {
    setLoginUser({ ...loginUser, [name]: value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await login(loginUser.email, loginUser.password);
      localStorage.setItem('id', response.id);
      localStorage.setItem('token', response.token);
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