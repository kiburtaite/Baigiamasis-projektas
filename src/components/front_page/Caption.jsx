import { Link } from 'react-router-dom';

const Caption = ({ question, answer_count , users }) => {

  const lastDigit = Number(String(answer_count).slice(-1));
  const user = users.find(user => user.id === question.user_id);

  return (
    <Link to={`/question/${question.id}`}><div key={question.id} className="caption">
      <h5>{question.date}</h5>
      <h1>{question.title}</h1>
      <h3>{user ? user.username : question.user_id}</h3>
      <h4>{answer_count}{
        (answer_count >= 10 && answer_count <= 19) || lastDigit === 0 ? " atsakymų"
         : lastDigit === 1 ? " atsakymas" : " atsakymai"
      }</h4>
    </div></Link>
  );
}

export default Caption