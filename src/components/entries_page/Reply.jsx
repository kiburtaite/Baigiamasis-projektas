import { useNavigate } from 'react-router-dom';

const Reply = ({ question_id }) => {

    const navigate = useNavigate();

    const addAnswer = e => {
        e.preventDefault();
        const newAnswer = {
          token: localStorage.getItem('token'),
          user_id: localStorage.getItem('user_id'),
          question_id: question_id,     
          text: e.target.elements.text.value
        };
        fetch(`http://localhost:5000/posts/questions/${question_id}/answers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(newAnswer)
      })
        .then(navigate(`/question/${question_id}`))
    };

    return (
      <div>
        <h3>Atsakyti į klausimą</h3>
        <form onSubmit={addAnswer}>
          <textarea
          name="text"
          placeholder="Atsakykite į klausimą"
          />
          <input
          type="submit"
          value="Atsakyti"
          />
        </form>
      </div>
    );
  }
  
  export default Reply