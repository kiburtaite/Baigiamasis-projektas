import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Authorized } from '../../App';

const Nav = () => {

    const authorized = useContext(Authorized);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/')
    }; 

    return (
      <div>
        <Link to='/'>Visi klausimai</Link>
        {authorized ? <Link to='/ask'>Užduoti naują klausimą</Link> : null}
        {authorized ? null : <Link to='/login'>Prisijungti</Link>}
        {authorized ? null : <Link to='/register'>Registruotis</Link>}
        {authorized ? <button onClick={logout}>Atsijungti</button>: null}
      </div>
    );
  }
  
  export default Nav