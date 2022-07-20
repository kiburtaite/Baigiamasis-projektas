import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
      <div className="mainForm">
        <p>Puslapis nerastas.</p>
        <Link to='/'>Grįžti į pradinį puslapį</Link>
      </div>
    );
  }
  
  export default NotFound