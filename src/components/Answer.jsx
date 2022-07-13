const Answer = ( {id, user, date, text} ) => {
    return (
      <div key={id}>
        <h4>{user}</h4>
        <h4>{date}</h4>
        <p>{text}</p>
      </div>
    );
  }
  
  export default Answer