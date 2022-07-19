import { useState, useEffect } from 'react';
import like_logo from '../../images/like.png';
import dislike_logo from '../../images/dislike.png';

const styleOn = {
    height: "20px"
};
const styleOff = {
    height: "20px",
    opacity: 0.3
};

const Ratings = ({ answer }) => {

    const user_id = localStorage.getItem('user_id');
    const [likes, setLikes] = useState(false);
    const [dislikes, setDislikes] = useState(false);
    const [answerRatings, setAnswerRatings] = useState([]);
    const findRating = answerRatings.find(rating => rating.user_id === user_id);
    const countLikes = answerRatings.filter(rating => rating.type === "like").length;
    const countDislikes = answerRatings.filter(rating => rating.type === "dislike").length;

    useEffect(() => {
        fetch(`http://localhost:5000/ratings/ratings`)
            .then(res => res.json()
            .then(data => data.filter(rating => rating.answer_id === answer.id))
            .then(data => setAnswerRatings(data)))
      }, [answer.id]);

    const addLike = () => {
        setDislikes(false);
        setLikes(true);
        switch (findRating){
            /*case findRating:
            fetch(`http://localhost:5000/ratings/ratings/${findRating.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            token: localStorage.getItem('token')
            })
        });*/
        default:
        fetch(`http://localhost:5000/ratings/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                user_id: user_id,
                answer_id: answer.id,
                type: 'like'
            })
        })
        .then(fetch(`http://localhost:5000/ratings/ratings`)
            .then(res => res.json()
            .then(data => data.filter(rating => rating.answer_id === answer.id))
            .then(data => setAnswerRatings(data))))
            break
        }
    };

    const addDislike = () => {
        setLikes(false);
        setDislikes(true);
        switch (findRating){
            /*case findRating:
            fetch(`http://localhost:5000/ratings/ratings/${findRating.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            token: localStorage.getItem('token')
            })
        });*/
        default:
        fetch(`http://localhost:5000/ratings/ratings`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token'),
                user_id: user_id,
                answer_id: answer.id,
                type: 'dislike'
            })
        })
        .then(fetch(`http://localhost:5000/ratings/ratings`)
            .then(res => res.json()
            .then(data => data.filter(rating => rating.answer_id === answer.id))
            .then(data => setAnswerRatings(data))))
            break
        }
    };

    const removeLike = () => {
        setLikes(false);
        fetch(`http://localhost:5000/ratings/ratings/${findRating.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            token: localStorage.getItem('token')
      })
    })
    };

    const removeDislike = () => {
        setDislikes(false);
        fetch(`http://localhost:5000/ratings/ratings/${findRating.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            token: localStorage.getItem('token')
      })
    })
    };

    return (
      <div>
        {!likes && <button onClick={addLike}>
        <span>{countLikes}</span>
            <img src={like_logo} alt="add like" style={styleOff}/>
        </button>}
        {likes && <button onClick={removeLike}>
            <span>{countLikes}</span>
            <img src={like_logo} alt="remove like" style={styleOn}/>
        </button>}
        {!dislikes && <button onClick={addDislike}>
            <img src={dislike_logo} alt="add dislike" style={styleOff}/>
            <span>{countDislikes}</span>
        </button>}
        {dislikes && <button onClick={removeDislike}>
            <img src={dislike_logo} alt="remove dislike" style={styleOn}/>
            <span>{countDislikes}</span>
        </button>}
      </div>
    );
  }
  
  export default Ratings