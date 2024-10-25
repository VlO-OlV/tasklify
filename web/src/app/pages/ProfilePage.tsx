import { useLoaderData, useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { useCookies } from 'react-cookie';
import { User } from '../types/User';
import ProfileBlock from '../components/ProfileBlock';

function ProfilePage () {

  const userData = useLoaderData() as User;

  const [,, removeAccessCookie] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const logout = () => {
    removeAccessCookie('accessToken');
    navigate('/login');
  }

  return (
    <>
      <Nav>
        <button className='button button-logout' onClick={logout}>Log out</button>
      </Nav>
      <main>
        <ProfileBlock userData={userData} />
        <div className="boards-block"></div>
      </main>
    </>
  );
}

export default ProfilePage;