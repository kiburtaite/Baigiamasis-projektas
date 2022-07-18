import { Link } from 'react-router-dom';

const Caption = ( {question, answer_count} ) => {

  const lastDigit = Number(String(answer_count).slice(-1));

  return (
    <div key={question.id}>
      <Link to={`/question/${question.id}`}><h3>{question.title}</h3></Link>
      <h4>{question.user_id}</h4>
      <h4>{question.date}</h4>
      <p>{answer_count}{
        (answer_count >= 10 && answer_count <= 19) || lastDigit === 0 ? " atsakymų"
         : lastDigit === 1 ? " atsakymas" : " atsakymai"
      }</p>
    </div>
  );
}

export default Caption