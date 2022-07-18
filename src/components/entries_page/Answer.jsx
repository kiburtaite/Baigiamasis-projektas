import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../App';
import EditAnswer from './EditAnswer';

const Answer = ({ answer, setAnswers }) => {

  const { authorized } = useContext(Context);
  const { page_id } = useParams();
  const personalPost = answer.user_id === localStorage.getItem('user_id');
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
    .then(fetch(`http://localhost:5000/posts/questions/${page_id}/answers`)
    .then(res => res.json()
    .then(data => setAnswers(data))))
  };

  return (
    <div key={answer.id}>
      <h4>{answer.user_id}</h4>
      <h4>{answer.date}</h4>
      <p>{answer.text}</p>
      {answer.edited && <h6>edited</h6>}
      {authorized && personalPost && <button onClick={() => setShowEdit(true)}>Redaguoti atsakymą</button>}
      {authorized && personalPost && <button onClick={() => {deleteAnswer(answer.id)}}>Ištrinti atsakymą</button>}
      {showEdit && <EditAnswer answer_id={answer.id} text={answer.text}/>}
    </div>
  );
}
  
  export default Answer