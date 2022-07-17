import { useState, useContext } from 'react';
import { Authorized } from '../../App';
import EditAnswer from './EditAnswer';

const Answer = ( {id, user, date, text, edited} ) => {

  const authorized = useContext(Authorized);
  const personalPost = user === localStorage.getItem('user_id');
  const [showEdit, setShowEdit] = useState(false);

  const deleteAnswer = (id) => {
    fetch(`http://localhost:5000/posts/answers/${id}`, {
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
      {authorized && personalPost ? <button onClick={() => setShowEdit(true)}>Redaguoti atsakymą</button>: null}
      {authorized && personalPost ? <button onClick={() => {deleteAnswer(id)}}>Ištrinti atsakymą</button>: null}
      {showEdit ? <EditAnswer answer_id={id} text={text}/> : null}
    </div>
  );
}
  
  export default Answer