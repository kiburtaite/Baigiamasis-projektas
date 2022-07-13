import { Link } from 'react-router-dom';

const Question0 = ( {id, title, user, date} ) => {
  return (
    <div key={id}>
      <Link to={`/questions/${id}`}><h3>{title}</h3></Link>
      <h4>{user}</h4>
      <h4>{date}</h4>
    </div>
  );
}

export default Question0