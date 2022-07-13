import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const Ask = () => {

    const navigate = useNavigate();

    const addQuestion = e => {
        e.preventDefault();
        const newQuestion = {
            id: uuid(),
            date: new Date().toISOString().slice(0, 10),
            user_id: "user0",
            title: e.target.elements.title.value,
            text: e.target.elements.text.value,
            edited: false
        };
        fetch('http://localhost:5000/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(newQuestion)
      })
        .then(navigate('/'))
    };

    return (
      <div>
        <h2>Užduoti naują klausimą</h2>
        <form onSubmit={addQuestion}>
            <input
            type="text"
            name="title"
            placeholder="Įveskite klausimo antraštę"
            />
            <textarea
            name="text"
            placeholder="Užduokite klausimą"
            />
            <input
            type="submit"
            value="Klausti"
            />
        </form>
      </div>
    );
  }
  
  export default Ask