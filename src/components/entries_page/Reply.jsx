const Reply = ({ question_id, setAnswers, setShowReply }) => {

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
            body: JSON.stringify(newAnswer)
      })
      .then(fetch(`http://localhost:5000/posts/questions/${question_id}/answers`)
        .then(res => res.json()
        .then(data => setAnswers(data))
        .then(setShowReply(false))))
    };

    return (
      <div>
        <h3>Atsakyti į klausimą</h3>
        <form onSubmit={addAnswer}>
          <textarea
          name="text"
          placeholder="Atsakykite į klausimą"
          /><br />
          <input
          type="submit"
          value="Atsakyti"
          />
        </form>
      </div>
    );
  }
  
  export default Reply