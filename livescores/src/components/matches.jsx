import Skeleton from '@mui/material/Skeleton'
import { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

/* eslint-disable react/prop-types */
const Matches = (props) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);

  const openModal = (event) => {
    console.log("opening modal");
    
    setIsOpen(true);
  };

  const closeModal = (event) => {
    if (!modalRef.current.contains(event.target)) {
      console.log("closing modal");
      setIsOpen(false);
    }
  };

// event listener for closing the modal
useEffect(() => {
  document.addEventListener("click", closeModal);

  return () => {
    document.removeEventListener("click", closeModal);
  };
}, []);

  
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
};

  return (
    <div className="flex items-center justify-center" onClick={openModal} ref={modalRef}>
      <div className="flex flex-col items-start justify-center league-container px-16 hover:bg-slate-100" id="teams" style={{ position: 'relative' }}>
        <div className="is-live flex pr-2 absolute" id="red-box" style={{ left: '0' }}>
            {
              (props.matchTime !== undefined)
              ? <h2 className="pl-5 pt-1 text-red-600 font-semibold" id="time">{props.matchTime + "'"}</h2>
              : null
            }
        </div>
        <div className=" flex justify-between items-center" id="hometeam">
          {
            (props.homeLogo === undefined)
            ? <Skeleton variant='circular' width={40} height={40}></Skeleton>
            : <img className="w-18 h-18 flex-none" src={props.homeLogo}></img>
          }
          <h2 className="pl-2 font-semibold w-32 text-left">{props.homeName}</h2>
          { // This should be removed / changed
            (props.homeScore < 1) 
            ? <h2 className="font-bold w-12 text-right" id="homescore">{props.homeScore}</h2>
            : <h2 className="font-bold w-12 text-right text-green-600" id="homescore">{props.homeScore}</h2>
          }
        </div>
        <div className="flex justify-between items-center pt-1 " id="awayteam">
          <img className="w-18 h-18 flex-none" src={props.awayLogo}></img>
          <h2 className="pl-2 font-semibold w-32 text-left">{props.awayName}</h2>
          { 
            (props.awayScore > props.homeScore) 
            ? <h2 className="font-bold w-12 text-right text-green-600" id="awayscore">{props.awayScore}</h2>
            : <h2 className="font-bold w-12 text-right " id="awayscore">{props.awayScore}</h2>
          }
        </div>
      </div>
      <Modal open={isOpen} onClose={closeModal}>
        <Box sx={modalStyle}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Matches;
