import List from './List';
import Nav from './Nav';
import '../../assets/styles/App.css';
import Modal from './Modal';
import React, { useState } from 'react';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState(1);
  const [lists, setLists] = useState([{name: "First"}, {name: "Second"}, {name: "Third"}]);

  function openModal(mode: number) {
    setModalMode(mode);
    setIsModalVisible(true);
  }

  function addList() {
    setLists(lists.concat([{name: "New list"}]));
  }

  function renderLists(lists: any[]): React.ReactElement[] {
    const listComponents = lists.map((list) => <List name={list.name} openModal={openModal}/>);
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