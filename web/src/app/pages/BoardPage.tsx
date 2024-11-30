import Nav from '../components/Nav';
import Toast from '../components/Toast';
import { Link, Outlet, } from 'react-router-dom';

function BoardPage() {

  /*const addList = async () => {
    createList({name: 'New List', boardId: boardId as string})
      .unwrap()
      .then(() => {
        refetchLists();
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }*/

  return (
    <>
      <Nav>
        <Link to='/profile'><button className='button-profile'></button></Link>
      </Nav>
      <main>
        <Outlet />
      </main>
      <Toast />
    </>
  );
}

export default BoardPage;