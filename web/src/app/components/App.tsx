import ListBlock from './ListBlock';
import Nav from './Nav';
import '../../public/styles/App.css';
import React from 'react';
import { List } from '../types/List';
import { useCreateListMutation, useGetAllListsQuery } from '../store/api/endpoints/listsApi';

function App() {
  const {data, isFetching} = useGetAllListsQuery();

  const [createList] = useCreateListMutation();

  const lists: List[] = data as List[];

  const addList = async () => {
    await createList({name: 'New list'}).unwrap();
  }

  function renderLists(lists: List[]): React.ReactElement[] {
    const listBlocks = lists.map((list) => <ListBlock data={list}/>);
    return listBlocks;
  }

  return (
    <div className="app">
      <Nav addList={addList}/>
      <main>
        <div className="lists-block">
          {!isFetching && renderLists(lists)}
        </div>
      </main>
    </div>
  );
}

export default App;