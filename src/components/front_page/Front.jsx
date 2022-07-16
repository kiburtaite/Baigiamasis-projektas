import { useState, useEffect } from 'react';
import Caption from './Caption';

const Front = () => {

  const [unfiltered, setUnfiltered] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [order, setOrder] = useState(0);
  
  useEffect(() => {
    fetch('http://localhost:5000/posts/questions')
      .then(res => res.json()
      .then(data => {
        setUnfiltered(data);
        setQuestions(data)
      }));
    fetch(`http://localhost:5000/posts/answers`)
      .then(res => res.json()
      .then(data => setAnswers(data)))
  }, []);

  const dateAsc = (a, b) => a.date > b.date ? 1 : -1;
  const dateDesc = (a, b) => a.date > b.date ? -1 : 1;

  const selected = e => {
    if(e.target.value==="all"){
      setQuestions(unfiltered)
    }
    if(e.target.value==="answered"){
      setQuestions(unfiltered.filter(question => answerCounter(question.id) !== 0))
    }
    if(e.target.value==="unanswered"){
      setQuestions(unfiltered.filter(question => answerCounter(question.id) === 0))
    }
  };

  const answerCounter = id => {
    const array = answers.filter(answer => answer.question_id === id);
    return array.length
  };

  return (
    <div>
      <div>
        <span>Rikiavimas </span>
        {order ?
          <button onClick={() => setOrder(0)}>Pagal datą</button> :
          <button onClick={() => setOrder(1)}>Pagal datą</button>
        }
        <span> Filtravimas </span>
        <select onChange={e => selected(e)}>
          <option value="all">Rodyti visus</option>
          <option value="answered">Rodyti atsakytus</option>
          <option value="unanswered">Rodyti neatsakytus</option>
        </select>
      </div>
      <div>
        {
          questions ? 
          questions.sort(order ? dateDesc : dateAsc)
          .map(question => 
            <Caption
            id={question.id}
            title={question.title}
            user={question.user_id}
            date={question.date}
            answers={answerCounter(question.id)}
            />)
          : <p>Loading...</p>
        }
      </div>
    </div>
  );
}
  
export default Front