import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../App';
import EditAnswer from './EditAnswer';
import Ratings from './Ratings';

const Answer = ({ answer, setAnswers, users }) => {

  const { authorized } = useContext(Context);
  const { page_id } = useParams();
  const user = users.find(user => user.id === answer.user_id);
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
    <div key={answer.id} className="answer">
      <span>{answer.date}</span>
      <span>{user? user.username : answer.user_id}</span>
      <h4>{answer.text}</h4>
      {answer.edited && <h6>edited</h6>}
      <Ratings answer={answer}/>
      {authorized && personalPost && <button onClick={() => setShowEdit(true)}>Redaguoti atsakymą</button>}
      {authorized && personalPost && <button onClick={() => {deleteAnswer(answer.id)}}>Ištrinti atsakymą</button>}
      {showEdit && <EditAnswer answer_id={answer.id} text={answer.text}/>}
    </div>
  );
}
  
  export default Answer