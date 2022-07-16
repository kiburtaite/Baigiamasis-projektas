import { Link } from 'react-router-dom';

const Caption = ( {id, title, user, date, answers} ) => {
  return (
    <div key={id}>
      <Link to={`/question/${id}`}><h3>{title}</h3></Link>
      <h4>{user}</h4>
      <h4>{date}</h4>
      <p>{answers} atsakymai</p>
    </div>
  );
}

export default Caption