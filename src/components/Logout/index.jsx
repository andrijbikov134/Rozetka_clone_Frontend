import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = (props) => {
  const navigate = useNavigate()

  useEffect(() => {
    localStorage.setItem('user_petrushka_style', null);
    sessionStorage.setItem('user_petrushka_style', null);
    props.loadCurrentUser();
    navigate('/');
  }, []);
}

export default Logout;
