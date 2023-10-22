import { Alert } from '@mui/material';
import { useState, useEffect } from 'react';

// eslint-disable-next-line react/prop-types
const LikeMessage = ({ message, severity }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      
      const timer = setTimeout(() => {
        setShow(false);
      }, 6000)

      return () => {
        clearTimeout(timer);
      }
    }
  }, [message]);

  return (
    <div id='message-container' className='flex items-center justify-center'>
       {show && <Alert severity="error">{message}</Alert>}
    </div>
  )
}

export default LikeMessage;