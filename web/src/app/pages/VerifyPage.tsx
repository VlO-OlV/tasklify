import { Link, Outlet } from 'react-router-dom';
import Nav from '../components/Nav';

function VerifyPage () {
  return (
    <>
      <Nav>
        <Link to='/login'><button className='button button-login'>Log in</button></Link>
        <Link to='/signup'><button className='button button-signup'>Sign up</button></Link>
      </Nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default VerifyPage;