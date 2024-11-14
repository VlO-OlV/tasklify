import TaskBlock from "./TaskBlock";
import '../../assets/styles/List.css';
import Menu from "./Menu";
import { useState } from "react";
import Modal from "./Modal";
import { Task } from "../types/Task";
import { useDeleteListByIdMutation, useUpdateListByIdMutation } from "../store/api/endpoints/listsApi";
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';
import { List } from '../types/List';
import { useGetBoardTasksQuery } from '../store/api/endpoints/boardsApi';
import { MenuModes } from '../enums/MenuModesEnum';

interface ListBlockProps {
  listData: List,
  refetchLists: () => void,
}

function ListBlock({
  listData,
  refetchLists
}: ListBlockProps) {

  const {
    data,
    isFetching: isTasksFetching,
    refetch: refetchTasks,
    error: fetchTasksError
  } = useGetBoardTasksQuery(listData.boardId);
  
  const [updateList] = useUpdateListByIdMutation();
  const [deleteList] = useDeleteListByIdMutation();

  const { showMessage } = useToastContext();

  const tasks: Task[] = data?.filter((task: Task) => task.listId === listData.id) as Task[];

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [currentName, setCurrentName] = useState(listData.name);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState(1);
  const [viewedTask, setViewedTask] = useState({});

  const updateListName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateList({id: listData.id, name: currentName})
      .unwrap()
      .then(() => {
        refetchLists();          
        setIsEditingMode(false);
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }

  const openModal = (mode: number) => {
    setModalMode(mode);
    setIsModalVisible(true);
  }

  const renderTasks = (tasks: Task[]): React.ReactElement[] => {
    const taskBlocks = tasks.map((task) => <TaskBlock taskData={task} openModal={(mode: number) => { openModal(mode); setViewedTask(task); }} refetchTasks={refetchTasks} />);
    return taskBlocks;
  }

  const removeList = async (listId: string) => {
    await deleteList({id: listId})
      .unwrap()
      .then(() => {
        refetchLists();
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }

  const handleDeleteList = () => {
    removeList(listData.id);
    setIsMenuVisible(false);
  }

  const handleEditList = () => {
    setIsEditingMode(true);
    setIsMenuVisible(false);
  }

  if (fetchTasksError) {
    showMessage(getErrorMsg(fetchTasksError));
    return (<></>);
  }

  return (
    <div className="list">
      { isMenuVisible ? <Menu menuMode={MenuModes.LIST} handleDelete={handleDeleteList} handleEdit={handleEditList}/> : null }
      {
        isEditingMode ?
          <form action="" className="list-header list-header_form" onSubmit={(e) => {updateListName(e);}}>
            <input type="text" name="name" placeholder="List name" defaultValue={listData.name} onChange={(e) => {setCurrentName(e.target.value);}} />
            <div>
              <button type="button" className="form_button button-cancel" onClick={() => {setIsEditingMode(false);}}></button>
              <button type="submit" className="form_button button-submit"></button>
            </div>
          </form>
        :
          <div className="list-header">
            <h3 className="list-title">{listData.name}</h3>
            <div>
              <p>{!isTasksFetching && tasks.length}</p>
              <button className="list-menu" onClick={() => {setIsMenuVisible(!isMenuVisible)}}></button>
            </div>
          </div>
      }
      <button className="list-add-task" onClick={() => {openModal(3);}}>Add new card</button>
      {!isTasksFetching && renderTasks(tasks)}
      { isModalVisible ? <Modal closeModal={() => {setIsModalVisible(false);}} changeMode={(mode: number) => {setModalMode(mode);}} refetchTasks={refetchTasks} mode={modalMode} listId={listData.id} taskData={viewedTask as Task} /> : null }
    </div>
  );
}

export default ListBlock;