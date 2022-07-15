import { useState, useEffect } from 'react';
import Question0 from './Question0';

const Questions = () => {

  const [questions, setQuestions] = useState([]);
  const [order, setOrder] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/api/questions')
      .then(res => res.json()
      .then(data => setQuestions(data)))
  }, []);

  const dateAsc = (a, b) => a.date > b.date ? 1 : -1;
  const dateDesc = (a, b) => a.date > b.date ? -1 : 1;

  return (
    <div>
      <div>
        <span>Rikiavimas </span>
        {order ?
          <button onClick={() => setOrder(0)}>Pagal datą</button> :
          <button onClick={() => setOrder(1)}>Pagal datą</button>
        }
      </div>
      <div>
        {
          questions ? 
          questions.sort(order ? dateDesc : dateAsc)
          .map(question => 
            <Question0
            id={question.id}
            title={question.title}
            user={question.user_id}
            date={question.date}
            />)
          : <p>Loading...</p>
        }
      </div>
    </div>
  );
}
  
export default Questions