import Skeleton from '@mui/material/Skeleton';
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"
import { useAuth } from '../provider/authProvider';

/* eslint-disable react/prop-types */
const Matches = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const [comments, setComments] = useState(0);
  const [likes, setLikes] = useState(0);
  const { token } = useAuth();
  const [hasLiked, setHasLiked] = useState(false);

  const [fillHeart, setFillHeart] = useState(hasLiked);

  // check if user has liked post using localstorage
  useEffect(() => {
    const hasLikedPost = localStorage.getItem(`liked_${props.matchId}`);
    
    if (hasLikedPost) {
      setHasLiked(true);
      setFillHeart(true);
    }
  }, [props.matchId]);


  // clicking the heart/like
  const heartClick = () => {
    if (!token) {
      props.setLikeMessage("Login to like!")
    } else if (hasLiked) {
      // User has already liked the post
      props.setLikeMessage("You've already liked this post");
    } else {
      setFillHeart(true);
      setLikes((prevLikes) => prevLikes + 1);

      localStorage.setItem(`liked_${props.matchId}`, 'true');

      // send data to server
      sendLikeToServer();

      setHasLiked(true);
    }
    
  };

  // unclick the heart, eg dislike
  const heartUnclick = () => {
    if (!token) {
      props.setLikeMessage("Login to dislike!");
    } else {
      setFillHeart(false);
      setLikes((prevLikes) => prevLikes - 1);

      localStorage.removeItem(`liked_${props.matchId}`);

      // send a dislike request to the server.
      sendDislikeToServer();

      setHasLiked(false);
    }
  };

  // opening the match modal
  const openModal = () => {
    console.log('opening modal');
    setIsOpen(true);
  };

  // closing modal
  const closeModal = (event) => {
    if (!modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  // Event listener for closing the modal
  useEffect(() => {
    document.addEventListener('click', closeModal);

    return () => {
      document.removeEventListener('click', closeModal);
    };
  }, []);

  // like request to server
  const sendLikeToServer = async () => {
    const matchId = props.matchId;

    try {
      const response = await fetch("http://localhost:3000/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId,
        }),
      });

      if (response.ok) {
        console.log("like saved")
      } else {
        console.error("error saving like:");
      }

    } catch (error) {
      console.error("Network error sending like:", error);
    }
  };

  // dislike request to server
  const sendDislikeToServer = async () => {
    const matchId = props.matchId;

    try {
      const response = await fetch("http://localhost:3000/dislikes", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          matchId,
        }),
      });

      if (response.ok) {
        console.log("dislike saved");
      } else {
        console.error("error saving dislike");
      }

    } catch (error) {
      console.error("Network error sending dislike")
    }
  }

  // fetch likes for matches
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/likes/${props.matchId}`)
        if (response.ok) {
          const likesData = await response.json();
          if (likesData.length > 0) {
            setLikes(likesData[0].likeCount);
          } else {
            setLikes(0);
          }
        } else {
          console.error("Failed to fetch likes")
        }
      } catch (error) {
        console.error("server error:", error);
      } 
    };

    fetchLikes();
  },[props.matchId]);

    // style for the modal
    const modalStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      borderRadius: 4,
      boxShadow: 4,
      p: 4,
    };

  return (
    <div className="flex items-center justify-center" onClick={openModal} ref={modalRef}>
      <div className="flex flex-col items-start justify-center teams-container px-16 hover:bg-slate-100" id="teams" style={{ position: 'relative' }}>
        <div className="is-live flex pr-2 absolute" id="red-box" style={{ left: '0' }}>
          {props.matchTime !== undefined ? <h2 className="pl-5 pt-1 text-red-600 font-semibold" id="time">{props.matchTime + "'"}</h2> : null}
        </div>
        <div className="flex justify-between items-center pt-5" id="hometeam">
          {props.homeLogo === undefined ? <Skeleton variant="circular" width={40} height={40}></Skeleton> : <img className="w-18 h-18 flex-none" src={props.homeLogo} />}
          <h2 className="pl-2 font-semibold w-32 text-left">{props.homeName}</h2>
          {props.homeScore < 1 ? <h2 className="font-bold w-12 text-right" id="homescore">{props.homeScore}</h2> : <h2 className="font-bold w-12 text-right text-green-600" id="homescore">{props.homeScore}</h2>}
        </div>
        <div className="flex justify-between items-center pt-1" id="awayteam">
          <img className="w-18 h-18 flex-none" src={props.awayLogo}/>
          <h2 className="pl-2 font-semibold w-32 text-left">{props.awayName}</h2>
          {props.awayScore > props.homeScore ? (
            <h2 className="font-bold w-12 text-right text-green-600" id="awayscore">
              {props.awayScore}
            </h2>
          ) : (
            <h2 className="font-bold w-12 text-right" id="awayscore">
              {props.awayScore}
            </h2>
          )}
        </div>
        <div id='likes-comments' className='mt-auto flex-row flex items-center space-x-32'>
          <div id='likes' className='flex items-center'>
            {fillHeart ? <AiFillHeart onClick={heartUnclick} className='text-xl'/> : <AiOutlineHeart onClick={() => {
              if (!token) {
                props.setLikeMessage("Please login to like"); // If not logged in
              } else {
                props.setLikeMessage(""); // Clear like message
                heartClick();
              }
            }} className='text-xl'/>}
            <h2>{likes}</h2>
          </div>
          <div id='comments' className='flex items-center'>
            <HiOutlineChatBubbleOvalLeft className='text-xl'/>
            <h2>{comments}</h2>
          </div>
        </div>
      </div>
      <Modal open={isOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
          <div className="flex justify-between items-center" id="hometeam">
            {props.homeLogo === undefined ? (
              <Skeleton variant="circular" width={40} height={40}></Skeleton>
            ) : (
              <img className="w-18 h-18 flex-none" src={props.homeLogo} />
            )}
            <h2 className="pl-2 font-semibold w-32 text-left">{props.homeName}</h2>
            {props.homeScore < 1 ? (
              <h2 className="font-bold w-12 text-right" id="homescore">
                {props.homeScore}
              </h2>
            ) : (
              <h2 className="font-bold w-12 text-right text-green-600" id="homescore">
                {props.homeScore}
              </h2>
            )}
          </div>
          <div className="flex justify-between items-center pt-1" id="awayteam">
            <img className="w-18 h-18 flex-none" src={props.awayLogo} />
            <h2 className="pl-2 font-semibold w-32 text-left">{props.awayName}</h2>
            {props.awayScore > props.homeScore ? (
              <h2 className="font-bold w-12 text-right text-green-600" id="awayscore">
                {props.awayScore}
              </h2>
            ) : (
              <h2 className="font-bold w-12 text-right" id="awayscore">
                {props.awayScore}
              </h2>
            )}
          </div>
          <Divider sx={{ mt: 2, mr: 0 }} />
          <div className="flex justify-center pr-16 pt-2">
            <h1 className="font-bold">Summary</h1>
          </div>
          <Divider sx={{ mt: 2, mr: 0 }} />
          {props.events && props.events.length > 0 ? (
            <div>
              {props.events.map((event, index) => (
                <div id="events-container" className="pt-2" key={index}>
                  <div id="team-and-player" className="flex items-center space-x-1">
                    <img className="w-18 h-18" src={event.team.logo} />
                    <h2 className='font-semibold' id='team'>{event.team.name}</h2>
                  </div>
                  <div id="score-events" className="flex flex-col mb-2">
                    <div id="time-and-event" className="flex items-center space-x-1">
                      <h2 id="scoretime" className="font-semibold">
                        {event.time.elapsed}'
                      </h2>
                      <h2>{event.player.name}</h2>
                      {/* Conditionally render different icons based on event type */}
                      {event.type === "Goal" && <span>⚽</span>}
                      {event.detail === "Yellow Card" && <span>🟨</span>}
                      {event.detail === "Red Card" && <span>🟥</span>}
                      {event.type === "subst" && <span>🔄</span>}
                    </div>
                  </div>
                  <Divider sx={{ mt: 0, mr: 0, }} />
                </div>
              ))}
            </div>
          ) : (
            <p>No event available</p>
          )}
          <div id='modal-social' className='pl-12 flex items-center mt-auto'  style={{ position: 'absolute', bottom: '0', left: '0', width: '100%' }}>
          {fillHeart ? <AiFillHeart onClick={heartUnclick} className='text-xl'/> : <AiOutlineHeart onClick={() => {
              if (!token) {
                props.setLikeMessage("Please login to like"); // If not logged in
              } else {
                props.setLikeMessage(""); // Clear like message
                heartClick();
              }
            }} className='text-xl'/>}
            <h2>{likes}</h2>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Matches;
