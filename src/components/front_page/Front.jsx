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
  const answersAsc = (a, b) => answerCounter(a.id) > answerCounter(b.id) ? 1 : -1;
  const answersDesc = (a, b) => answerCounter(a.id) > answerCounter(b.id) ? -1 : 1;

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
          <button onClick={() => setOrder(0)}>Seniausi</button>
          <button onClick={() => setOrder(1)}>Naujausi</button>
          <button onClick={() => setOrder(2)}>Daugiausiai atsakymų</button>
          <button onClick={() => setOrder(3)}>Mažiausiai atsakymų</button>
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
          questions.sort(
            order === 0 ? dateAsc : 
            order === 1 ? dateDesc : 
            order === 2 ? answersDesc : answersAsc
            )
          .map(question => 
            <Caption
            question={question}
            answer_count={answerCounter(question.id)}
            />)
          : <p>Loading...</p>
        }
      </div>
    </div>
  );
}
  
export default Front