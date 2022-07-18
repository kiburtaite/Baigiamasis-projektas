import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../App';

const Nav = () => {

    const { authorized, setAuthorized } = useContext(Context);

    const logout = () => {
        localStorage.clear();
        setAuthorized(false)
    }; 

    return (
      <div>
        <Link to='/'>Visi klausimai</Link>
        {authorized && <Link to='/ask'>Užduoti naują klausimą</Link>}
        {!authorized && <Link to='/login'>Prisijungti</Link>}
        {!authorized && <Link to='/register'>Registruotis</Link>}
        {authorized && <button onClick={logout}>Atsijungti</button>}
      </div>
    );
  }
  
  export default Nav