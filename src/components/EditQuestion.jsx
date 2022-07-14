const EditQuestion = ({ question_id, title, text }) => {

    const editQuestion = e => {
        fetch(`http://localhost:5000/api/questions/${question_id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                title: e.target.elements.title.value,
                text: e.target.elements.text.value,
                edited: true
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
            />
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
  
  export default EditQuestion