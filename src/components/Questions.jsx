import { useState, useEffect } from 'react';
import Question0 from './Question0';

const Questions = () => {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json()
      .then(data => setQuestions(data)))
  }, []);

    return (
      <div>
        {
          questions ? 
          questions.map(question => 
            <Question0
            id={question.id}
            title={question.title}
            user={question.user_id}
            date={question.date}
            />)
          : <p>Loading...</p>
        }
      </div>
    );
  }
  
  export default Questions