const Answer = ( {id, user, date, text} ) => {

  const deleteAnswer = (id) => {
    fetch(`http://localhost:5000/api/answers/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  };

  return (
    <div key={id}>
      <h4>{user}</h4>
      <h4>{date}</h4>
      <p>{text}</p>
      <button onClick={() => {deleteAnswer(id)}}>Ištrinti atsakymą</button>
    </div>
  );
}
  
  export default Answer