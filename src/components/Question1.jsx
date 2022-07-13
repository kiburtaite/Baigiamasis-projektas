const Question1 = ( {id, title, user, date, text} ) => {
    return (
      <div key={id}>
        <h3>{title}</h3>
        <h4>{user}</h4>
        <h4>{date}</h4>
        <p>{text}</p>
      </div>
    );
  }
  
  export default Question1