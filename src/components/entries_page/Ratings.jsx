import { useState } from 'react';
import like_logo from '../../images/like.png';
import dislike_logo from '../../images/dislike.png';

const styleOn = {
    height: "20px"
};
const styleOff = {
    height: "20px",
    opacity: 0.3
};

const Ratings = () => {

    const [likes, setLikes] = useState(false);
    const [dislikes, setDislikes] = useState(false);

    const addLike = () => {
        setDislikes(false);
        setLikes(true)
    };

    const addDislike = () => {
        setLikes(false);
        setDislikes(true)
    };

    const removeLike = () => {
        setLikes(false)
    };

    const removeDislike = () => {
        setDislikes(false)
    };

    return (
      <div>
        {!likes && <button onClick={addLike}><img src={like_logo} style={styleOff}/></button>}
        {likes && <button onClick={removeLike}><img src={like_logo} style={styleOn}/></button>}
        {!dislikes && <button onClick={addDislike}><img src={dislike_logo} style={styleOff}/></button>}
        {dislikes && <button onClick={removeDislike}><img src={dislike_logo} style={styleOn}/></button>}
      </div>
    );
  }
  
  export default Ratings