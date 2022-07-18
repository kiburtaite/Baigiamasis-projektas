import { useNavigate } from 'react-router-dom';

const Ask = () => {

    const navigate = useNavigate();

    const addQuestion = e => {
        e.preventDefault();
        const newQuestion = {
            token: localStorage.getItem('token'),
            user_id: localStorage.getItem('user_id'),
            title: e.target.elements.title.value,
            text: e.target.elements.text.value,
        };
        fetch('http://localhost:5000/posts/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(newQuestion)
      })
        .then(navigate('/', { replace : true }))
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