import ListBlock from './ListBlock';
import Nav from './Nav';
import '../../assets/styles/App.css';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { List, createList } from '../slices/listsSlice';

function App() {
  const lists: List[] = useAppSelector((state) => state.lists.lists);
  const dispatch = useAppDispatch();

  function addList() {
    dispatch(createList("New List"));
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
          {renderLists(lists)}
        </div>
      </main>
    </div>
  );
}

export default App;