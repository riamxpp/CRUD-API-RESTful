import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import style from './Profile.module.css';
import { getUser } from "../../services/api";

const Profile = () => {
  const { logOut } = useContext(AuthContext);
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(true);
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
        setData(response);
        setLoading(false);
      }
    }catch(error) {
      return error;
    }finally {
      setLoading(false);
    }
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
                <span className={style.name}>{data.name}</span>
                <span className={style.email}>{data.email}</span>
              </div>
            </div>
          </aside>
          <aside className={style.buttonsContainer}>
            <button className={style.button}>Editar dados</button>
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