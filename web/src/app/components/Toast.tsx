import { useToastContext } from '../hooks/contexts/ToastContext';
import '../../assets/styles/Toast.css';

function Toast () {
  const { message, clearMessage } = useToastContext();

  return (
    message.length !== 0 ?
      <div className='toast-block'>
        <div className='toast-message-block'>
          <p className='toast-message'>{ message }</p>
        </div>
        <button className='toast-close-button' onClick={clearMessage}></button>
      </div>
    :
      null
  );
}

export default Toast;