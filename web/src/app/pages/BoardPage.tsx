import ListBlock from '../components/ListBlock';
import Nav from '../components/Nav';
import '../../assets/styles/BoardPage.css';
import React from 'react';
import { List } from '../types/List';
import { useCreateListMutation, useGetAllListsQuery } from '../store/api/endpoints/listsApi';
import Toast from '../components/Toast';
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';

function BoardPage() {
  const { 
    data,
    isFetching: isListsFetching,
    refetch: refetchLists,
    error: fetchListsError,
  } = useGetAllListsQuery();

  const [ createList ] = useCreateListMutation();
  const { showMessage } = useToastContext();

  const lists: List[] = data as List[];

  if (fetchListsError) {
    showMessage(getErrorMsg(fetchListsError));
  }

  const addList = async () => {
    createList({name: 'New List'})
      .unwrap()
      .then(() => {
        refetchLists();
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }

  function renderLists(lists: List[]): React.ReactElement[] {
    const listBlocks = lists.map((list) => <ListBlock listData={list} refetchLists={refetchLists}/>);
    return listBlocks;
  }

  return (
    <>
      <Nav>
        <button className="button button-history">History</button>
        <button className="button button-list" onClick={addList}>Create new list</button>
      </Nav>
      <main>
        <div className="lists-block">
          {!isListsFetching && renderLists(lists)}
        </div>
      </main>
      <Toast />
    </>
  );
}

export default BoardPage;