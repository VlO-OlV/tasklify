import { useState } from 'react';
import '../../assets/styles/Task.css';
import Menu from './Menu';
import { List } from '../types/List';
import { Task } from '../types/Task';
import { useDeleteTaskByIdMutation, useUpdateTaskByIdMutation } from '../store/api/endpoints/tasksApi';
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';
import getDateString from '../utils/getDateString';
import { formatEnum } from '../utils/formatEnum';
import { useParams } from 'react-router-dom';
import { useGetBoardListsQuery } from '../store/api/endpoints/boardsApi';
import { MenuModes } from '../enums/MenuModesEnum';

interface TaskBlockProps {
  refetchTasks: () => void,
  taskData: Task,
  openModal: (mode: number) => void,
}

function TaskBlock({
  refetchTasks,
  taskData,
  openModal,
}: TaskBlockProps) {

  const { boardId } = useParams();

  const {
    data,
    error: fetchListsError,
  } = useGetBoardListsQuery(boardId as string);

  const [deleteTask] = useDeleteTaskByIdMutation();
  const [updateTask] = useUpdateTaskByIdMutation();

  const { showMessage } = useToastContext();

  const lists: List[] = data as List[];

  const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const removeTask = async (taskId: string) => {
    await deleteTask({id: taskId})
      .unwrap()
      .then(() => {
        refetchTasks();
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }

  const handleDeleteTask = () => {
    removeTask(taskData.id);
    setIsMenuVisible(false);
  }

  const handleEditTask = () => {
    openModal(2);
    setIsMenuVisible(false);
  }

  const moveTask = async (targetListId: string) => {
    const updatedTask: Task = {
      ...taskData,
      listId: targetListId,
    };
    await updateTask(updatedTask)
      .unwrap()
      .then(() => {
        refetchTasks();
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }

  const renderListOptions = (lists: List[]): React.ReactElement[] => {
    const filteredLists = lists.filter((list) => list.id !== taskData.listId);
    const listOptions = filteredLists.map((list, index) => (<button className={`task-dropdown-content-button ${index === filteredLists.length-1 ? 'lastList' : ''}`} onClick={() => {moveTask(list.id);}}>{list.name}</button>));
    return listOptions;
  }

  if (fetchListsError) {
    showMessage(getErrorMsg(fetchListsError));
    return (<></>);
  }

  return (
    <div className="task" onClick={() => {openModal(1);}}>
      { isMenuVisible ? <Menu menuMode={MenuModes.TASK} handleDelete={handleDeleteTask} handleEdit={handleEditTask}/> : null }
      <div className="task-header">
        <h3 className="task-title">{taskData.name}</h3>
        <button className="task-menu" onClick={(e) => {e.stopPropagation(); setIsMenuVisible(!isMenuVisible)}}></button>
      </div>
      <p className="task-description">{taskData.description}</p>
      <span className="task-deadline">{taskData.deadline ? getDateString(new Date(taskData.deadline)) : 'No deadline'}</span>
      <span className="task-priority">{formatEnum(taskData.priority)}</span>
      <div className="task-dropdown" onClick={(e) => {e.stopPropagation();}}>
        <button className={ isVisibleDropdown ? "task-dropdown-button task-dropdown-button_active" : "task-dropdown-button"} onClick={ () => {setIsVisibleDropdown(!isVisibleDropdown)} }>Move to:</button>
        { isVisibleDropdown ? 
        <div className="task-dropdown-content">
          {renderListOptions(lists)}
        </div> : null }
      </div>
    </div>
  );
}

export default TaskBlock;