import { useState, useContext } from 'react';
import { Context } from '../../App';
import EditAnswer from './EditAnswer';

const Answer = ( {id, user, date, text, edited} ) => {

  const { authorized } = useContext(Context);
  const personalPost = user === localStorage.getItem('user_id');
  const [showEdit, setShowEdit] = useState(false);

  const deleteAnswer = (id) => {
    fetch(`http://localhost:5000/posts/answers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    })
  };

  return (
    <div key={id}>
      <h4>{user}</h4>
      <h4>{date}</h4>
      <p>{text}</p>
      {edited && <h6>edited</h6>}
      {authorized && personalPost && <button onClick={() => setShowEdit(true)}>Redaguoti atsakymą</button>}
      {authorized && personalPost && <button onClick={() => {deleteAnswer(id)}}>Ištrinti atsakymą</button>}
      {showEdit && <EditAnswer answer_id={id} text={text}/>}
    </div>
  );
}
  
  export default Answer