const EditAnswer = ( { answer_id, text} ) => {

  const editAnswer = e => {
    fetch(`http://localhost:5000/api/answers/${answer_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body : JSON.stringify({
        text: e.target.elements.text.value,
        edited: true
      })
    })
  };

    return (
      <div>
        <h3>Redaguoti atsakymą</h3>
        <form onSubmit={editAnswer}>
          <textarea
          name="text"
          defaultValue={text}
          />
          <input
          type="submit"
          value="Redaguoti"
          />
        </form>
      </div>
    );
  }
  
  export default EditAnswer