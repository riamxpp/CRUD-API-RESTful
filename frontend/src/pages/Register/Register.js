import { useState } from "react";
import Input from "../../components/Input/Input";
import style from './Register.module.css';
import { createUser } from "../../services/api";
import { Link } from 'react-router-dom';

const Register = () => {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (name, value) => {
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    setError('');
    
    try {
      if (register.name || register.email || register.password) {
        const response = await createUser(register.name, register.email, register.password);
        console.log(response);
      }else {
        setError("Preencha todos os campos!");
      }
    }catch(error){
      setError('Erro ao cadastrar um usuário!');
    }
  }

  return (
    <>
      <section className={style.main}>
        <h1>Cadastre-se</h1>
        <p>Já possui conta ? então faça <Link to='/login'>login</Link></p>
        <form className={style.formulario} onSubmit={handleSubmit}>
          <Input 
            label='Nome' 
            name="name" 
            value={register.name} 
            onChange={(value) => handleInputChange('name', value)} 
            placeholder="Digite seu nome"
          />
          <Input 
            label='Email' 
            name="email" 
            value={register.email} 
            onChange={(value) => handleInputChange('email', value)} 
            placeholder="Digite seu email"
            type="email"
          />
          <Input 
            label='Senha' 
            name="password" 
            value={register.password} 
            onChange={(value) => handleInputChange('password', value)} 
            placeholder="Digite sua senha"
            type="password"
          />
          {error && <p className={style.error}>{error}</p>}
          <div className={style.buttonContainer}>
            <button className={style.button} type="submit">Enviar</button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Register;