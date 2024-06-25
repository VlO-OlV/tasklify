import ListBlock from './ListBlock';
import Nav from './Nav';
import '../../assets/styles/App.css';
import Modal from './Modal';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { List, createList, deleteListById, updateListById } from '../slices/listsSlice';

function App() {
  const lists: List[] = useAppSelector((state) => state.lists.lists);
  const dispatch = useAppDispatch();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState(1);

  function openModal(mode: number) {
    setModalMode(mode);
    setIsModalVisible(true);
  }

  function addList() {
    dispatch(createList("New List"));
  }

  function deleteList(listId: string) {
    dispatch(deleteListById(listId));
  }

  function updateList(listData: List) {
    dispatch(updateListById(listData));
  }

  function renderLists(lists: List[]): React.ReactElement[] {
    const listComponents = lists.map((list) => <ListBlock data={list} openModal={openModal} deleteList={deleteList}/>);
    return listComponents;
  }

  return (
    <div className="app">
      <Nav addList={addList}/>
      <main>
        <div className="lists-block">
          {renderLists(lists)}
        </div>
      </main>
      { isModalVisible ? <Modal closeModal={() => {setIsModalVisible(false);}} mode={modalMode} changeMode={(mode: number) => {setModalMode(mode);}} /> : null }
    </div>
  );
}

export default App;