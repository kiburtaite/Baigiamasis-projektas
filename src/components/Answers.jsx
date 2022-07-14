import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Question1 from './Question1';
import Answer from './Answer';

const Answers = () => {

    const { page_id } = useParams();

    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5000/api/questions`)
        .then(res => res.json()
        .then(data => data.find(entry => entry.id === page_id))
        .then(data => setQuestion(data))
      );
      fetch(`http://localhost:5000/api/questions/${page_id}/answers`)
        .then(res => res.json()
        .then(data => setAnswers(data)))
    }, []);

    return (
      <div>
        <div>
          {
            question ?
            <Question1 
            id={question.id}
            title={question.title}
            user={question.user_id}
            date={question.date}
            text={question.text}
            edited={question.edited}
            />
            : <p>Loading...</p>
          }
        </div>
        <div>
        {
          answers ? 
          answers.map(answer => 
            <Answer
            id={answer.id}
            user={answer.user_id}
            date={answer.date}
            text={answer.text}
            edited={answer.edited}
            />)
          : <p>Loading...</p>
        }
      </div>
      </div>
    );
  }
  
  export default Answers