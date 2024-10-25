import Nav from '../components/Nav';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import checkAuthUser from '../utils/checkAuthUser';
import { useCookies } from 'react-cookie';

function HomePage () {

  const [,, removeAccessCookie] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);

  const logout = () => {
    removeAccessCookie('accessToken');
    navigate('/login');
  }

  checkAuthUser()
    .then((res) => setIsAuth(!!res));

  return (
    <>
      <Nav>
        {
          isAuth ?
            <>
              <button className='button button-logout' onClick={logout}>Log out</button>
              <Link to='/profile'><button className='button-profile'></button></Link>
            </>
          :
            <>
              <Link to='/login'><button className='button button-login'>Log in</button></Link>
              <Link to='/signup'><button className='button button-signup'>Sign up</button></Link>
            </>
        }
      </Nav>
    </>
  );
}

export default HomePage;