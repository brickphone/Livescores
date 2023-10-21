import { Alert } from '@mui/material';
import { useState, useEffect } from 'react';

const LikeMessage = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 3000)

      return () => {
        clearTimeout(timer);
      }
    }
  }, [message]);

  return (
    <div id='message-container' className='flex items-center justify-center'>
      <Alert severity='error'>Please login to like / comment</Alert>
    </div>
  )
}

export default LikeMessage;