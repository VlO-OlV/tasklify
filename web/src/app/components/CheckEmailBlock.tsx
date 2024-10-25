import '../../assets/styles/CheckEmailBlock.css';

function CheckEmailBlock () {

  return (
    <div className="email-block">
      <div className="email-icon"></div>
      <h2 className="email-title">Check your email</h2>
      <p className="email-description">Just click on the link in that email to complete your signup. If you don't see it, you may need to check your spam folder.</p>
      <div className="email-resend-block">
        <p className="resend-text">Still can't find the email? No problem.</p>
        <button className="resend-button">Resend verification email</button>
      </div>
    </div>
  );
}

export default CheckEmailBlock;