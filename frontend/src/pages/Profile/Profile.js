import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import style from './Profile.module.css';

const Profile = () => {
  const { name, email, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <section className={style.main}>
        <div>
          <h1>Profile</h1>
          <p>{name}</p>
          <p>{email}</p>
        </div>
        <div>
          <button>Editar dados</button>
          <button onClick={() => {
            logOut();
            navigate('/');
          }}>Logout</button>
          <button>Deletar conta</button>
        </div>
      </section>
    </>
  )
}

export default Profile;