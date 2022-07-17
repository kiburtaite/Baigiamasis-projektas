import { Link } from 'react-router-dom';

const Caption = ( {id, title, user, date, answers} ) => {

  const lastDigit = String(answers).slice(-1);

  return (
    <div key={id}>
      <Link to={`/question/${id}`}><h3>{title}</h3></Link>
      <h4>{user}</h4>
      <h4>{date}</h4>
      <p>{answers}{
        answers >= 10 && answers <= 19 || lastDigit == 0 ? " atsakymų"
         : lastDigit == 1 ? " atsakymas" : " atsakymai"
      }</p>
    </div>
  );
}

export default Caption