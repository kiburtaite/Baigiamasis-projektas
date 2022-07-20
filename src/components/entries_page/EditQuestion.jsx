const EditQuestion = ({ question_id, title, text }) => {

    const editQuestion = e => {
        fetch(`http://localhost:5000/posts/questions/${question_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                title: e.target.elements.title.value,
                text: e.target.elements.text.value
            })
        })
    };

    return (
      <div>
        <h3>Redaguoti klausimą</h3>
        <form onSubmit={editQuestion}>
            <input
            type="text"
            name="title"
            defaultValue={title}
            /><br/>
            <textarea
            name="text"
            defaultValue={text}
            rows="6"
            /><br/>
            <input
            type="submit"
            value="Redaguoti"
            />
        </form>
      </div>
    );
  }
  
  export default EditQuestion