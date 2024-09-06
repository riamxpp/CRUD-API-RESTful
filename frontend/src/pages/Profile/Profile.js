import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import style from './Profile.module.css';
import { getUser, updateUser } from "../../services/api";
import Input from "../../components/Input/Input";

const Profile = () => {
  const { logOut } = useContext(AuthContext);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
  const [updateDate, setUpdateData] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  
  const id = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  
  if (!id) {
    navigate('/login');
  }

  async function collectsInfo () {
    setLoading(true);
    try {
      if (id){
        const response = await getUser(id, token);
        setLoading(false);
        setData(response);
        setUserData({
          name: response.name,
          email: response.email,
          password: '',
        });
      }
    }catch(error) {
      return error;
    }finally {
      setLoading(false);
    }
  }

  async function updateInfo (event) {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await updateUser(id, token, userData.name, userData.email, userData.password);
      setData(response);
      setUpdateData(false);
    }catch (error) {
      return error;
    }finally {
      setLoading(false);
    }
  };

  const handleChange = (name, value) => {
    setUserData({ ...userData, [name]: value });
  }

  useEffect(() => {
    collectsInfo();
  }, []);

  if (loading) {
    return (
      <div>Carregando...</div>
    )
  }

  return (
    <>
      <section className={style.main}>
        <div className={style.profileContainer}>
          <aside>
            <h1>Perfil</h1>
            <div className={style.mainContainerInfos}>
              <div className={style.containerFoto}>
                <img className={style.avatar} src='/images/default_avatar_icon.jpg' alt='avatar padrão'></img>
              </div>
              <div className={style.containerInfos}>
                {updateDate ? 
                <>
                  <form onSubmit={updateInfo}>
                    <Input 
                      className={style.input} 
                      value={userData.name}
                      onChange={(value) => handleChange('name', value)}/>
                    <Input 
                      className={style.input} 
                      value={userData.email}
                      onChange={(value) => handleChange('email', value)}/>
                    <Input 
                      className={style.input} 
                      value={userData.password}
                      placeholder="Senha"
                      type="password"
                      onChange={(value) => handleChange('password', value)}/>
                    {updateDate ? <button type="sumib" className={style.button}>Atualizar</button> : ''}
                  </form>  
                </>
                :
                <>
                  <span className={style.name}>{data.name}</span>
                  <span className={style.email}>{data.email}</span>
                </>}
              </div>
            </div>
          </aside>
          {/* {updateDate && <span className={style.aviso}>Pressione a tecla ENTER para atualizar.</span>} */}
          <aside className={style.buttonsContainer}>
            <button 
            className={style.button}
            onClick={() => {
              setUpdateData(!updateDate);
            }}
            >
              {updateDate ? 'Voltar' : 'Editar dados'}
            </button>
            <button 
              className={style.button}
              onClick={() => {
                logOut();
                navigate('/');
              }}>Logout</button>
            <button className={style.button}>Deletar conta</button>
          </aside>
        </div>
      </section>
    </>
  )
}

export default Profile;