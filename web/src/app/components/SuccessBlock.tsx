import { Link } from 'react-router-dom';
import '../../assets/styles/SuccessBlock.css';

function SuccessBlock () {

  return (
    <div className="success-block">
      <div className="success-icon"></div>
      <h2 className="success-title">Verified</h2>
      <p className="success-description">Your email has been successfully verified. Click below to log in.</p>
      <Link to='/login'><button className="success-button">Continue</button></Link>
    </div>
  );
}

export default SuccessBlock;