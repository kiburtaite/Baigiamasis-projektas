import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Reply from './Reply';

const Question1 = ( {id, title, user, date, text } ) => {

  const navigate = useNavigate();
  
  const [showReply, setShowReply] = useState(false);

  const deleteQuestion = (id) => {
    fetch(`http://localhost:5000/api/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(navigate('/'))
  };

  return (
    <div key={id}>
      <h3>{title}</h3>
      <h4>{user}</h4>
      <h4>{date}</h4>
      <p>{text}</p>
      <button onClick={() => {deleteQuestion(id)}}>Ištrinti klausimą</button>
      <button onClick={() => setShowReply(true)}>Atsakyti į klausimą</button>
      {showReply ? <Reply question_id={id}/> : null}
    </div>
  );
}
  
export default Question1