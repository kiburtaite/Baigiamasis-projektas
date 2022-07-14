import { useState } from 'react';
import EditAnswer from './EditAnswer';

const Answer = ( {id, user, date, text, edited} ) => {

  const [showEdit, setShowEdit] = useState(false);

  const deleteAnswer = (id) => {
    fetch(`http://localhost:5000/api/answers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };

  return (
    <div key={id}>
      <h4>{user}</h4>
      <h4>{date}</h4>
      <p>{text}</p>
      {edited ? <h6>edited</h6> : null}
      <button onClick={() => setShowEdit(true)}>Redaguoti atsakymą</button>
      <button onClick={() => {deleteAnswer(id)}}>Ištrinti atsakymą</button>
      {showEdit ? <EditAnswer answer_id={id} text={text}/> : null}
    </div>
  );
}
  
  export default Answer