import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
      <div>
        <p>Puslapis nerastas.</p>
        <Link to='/'>Grįžti į pradinį puslapį</Link>
      </div>
    );
  }
  
  export default NotFound