import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../Context';
import EditQuestion from './EditQuestion';
import Reply from './Reply';

const Question = ( {id, title, user, date, text, edited } ) => {

  const navigate = useNavigate();
  const { authorized } = useContext(Context);
  const personalPost = user === localStorage.getItem('user_id');
  const [showEdit, setShowEdit] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const deleteQuestion = (id) => {
    fetch(`http://localhost:5000/posts/questions/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      })
    })
      .then(navigate('/'))
  };

  return (
    <div key={id}>
      <h3>{title}</h3>
      <h4>{user}</h4>
      <h4>{date}</h4>
      <p>{text}</p>
      {edited && <h6>edited</h6>}
      {authorized && personalPost && <button onClick={() => setShowEdit(true)}>Redaguoti klausimą</button>}
      {authorized && personalPost && <button onClick={() => {deleteQuestion(id)}}>Ištrinti klausimą</button>}
      {authorized ? <button onClick={() => setShowReply(true)}>Atsakyti į klausimą</button>: null}
      {showEdit && <EditQuestion question_id={id} title={title} text={text}/>}
      {showReply && <Reply question_id={id}/>}
    </div>
  );
}
  
export default Question