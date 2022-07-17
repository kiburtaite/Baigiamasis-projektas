import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Authorized } from '../../App';

const Nav = () => {

    const authorized = useContext(Authorized);

    return (
      <div>
        <Link to='/'>Visi klausimai</Link>
        {authorized ? <Link to='/ask'>Užduoti naują klausimą</Link> : null}
        {authorized ? null : <Link to='/login'>Prisijungti</Link>}
        {authorized ? null : <Link to='/register'>Registruotis</Link>}
      </div>
    );
  }
  
  export default Nav