import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { name, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>Profile</h1>
      <p>{name}</p>
      <button onClick={() => {
        logOut();
        navigate('/');
      }}>Logout</button>
    </>
  )
}

export default Profile;