const EditAnswer = ( { answer_id, text} ) => {

  const editAnswer = e => {
    fetch(`http://localhost:5000/posts/answers/${answer_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token: localStorage.getItem('token'),
        text: e.target.elements.text.value
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
          /><br/>
          <input
          type="submit"
          value="Redaguoti"
          />
        </form>
      </div>
    );
  }
  
  export default EditAnswer