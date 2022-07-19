import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../../App';
import EditQuestion from './EditQuestion';
import Reply from './Reply';

const Question = ({ question, setAnswers }) => {

  const navigate = useNavigate();
  const { authorized } = useContext(Context);
  const personalPost = question.user_id === localStorage.getItem('user_id');
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
      .then(navigate('/', { replace: true }))
  };

  return (
    <div key={question.id}>
      <h3>{question.title}</h3>
      <h4>{question.user_id}</h4>
      <h4>{question.date}</h4>
      <p>{question.text}</p>
      {question.edited && <h6>edited</h6>}
      {authorized && personalPost && <button onClick={() => setShowEdit(true)}>Redaguoti klausimą</button>}
      {authorized && personalPost && <button onClick={() => {deleteQuestion(question.id)}}>Ištrinti klausimą</button>}
      {authorized ? <button onClick={() => setShowReply(true)}>Atsakyti į klausimą</button>: null}
      {showEdit && <EditQuestion question_id={question.id} title={question.title} text={question.text}/>}
      {showReply && <Reply question_id={question.id} setAnswers={setAnswers} setShowReply={setShowReply}/>}
    </div>
  );
}
  
export default Question