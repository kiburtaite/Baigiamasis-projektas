import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Question from './Question';
import Answer from './Answer';

const Entries = () => {

    const { page_id } = useParams();

    const [question, setQuestion] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5000/posts/questions`)
        .then(res => res.json()
        .then(data => data.find(entry => entry.id === page_id))
        .then(data => setQuestion(data))
      );
      fetch(`http://localhost:5000/posts/questions/${page_id}/answers`)
        .then(res => res.json()
        .then(data => setAnswers(data)))
    }, []);

    return (
      <div>
        <div>
          {
            question ?
            <Question 
            question={question}
            setAnswers={setAnswers}
            />
            : <p>Loading...</p>
          }
        </div>
        <div>
        {
          answers ? 
          answers.map(answer => 
            <Answer 
            answer={answer}
            setAnswers={setAnswers}
            />)
          : <p>Loading...</p>
        }
      </div>
      </div>
    );
  }
  
  export default Entries