import { useState } from 'react';
import '../../assets/styles/Task.css';
import Menu from './Menu';
import { List } from '../types/List';
import { Task } from '../types/Task';
import { useDeleteTaskByIdMutation, useUpdateTaskByIdMutation } from '../store/api/endpoints/tasksApi';
import { useGetAllListsQuery } from '../store/api/endpoints/listsApi';
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';
import getDateString from '../utils/getDateString';
import { formatPriority } from '../utils/formatPriority';

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

    const {
        data,
        error: fetchListsError,
    } = useGetAllListsQuery();

    const [deleteTask] = useDeleteTaskByIdMutation();
    const [updateTask] = useUpdateTaskByIdMutation();

    const { showMessage } = useToastContext();

    const lists: List[] = data as List[];

    if (fetchListsError) {
        showMessage(getErrorMsg(fetchListsError));
    }

    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
    const [isVisibleOptions, setIsVisibleOptions] = useState(false);

    const closeMenu = () => {
        setIsVisibleOptions(false);
    }

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
        let listOptions = [];
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id !== taskData.listId) {
                if (i < lists.length-1) {
                    listOptions.push(<button className="task-dropdown-content-button" onClick={() => {moveTask(lists[i].id);}}>{lists[i].name}</button>)
                } else {
                    listOptions.push(<button className="task-dropdown-content-button lastList" onClick={() => {moveTask(lists[i].id);}}>{lists[i].name}</button>)
                }
            }
        }
        return listOptions;
    }

    return (
        <div className="task" onClick={() => {openModal(1);}}>
            <div className="task-header">
                <h3 className="task-title">{taskData.name}</h3>
                <button className="task-menu" onClick={(e) => {e.stopPropagation(); setIsVisibleOptions(!isVisibleOptions)}}></button>
            </div>
            { isVisibleOptions ? <Menu isList={false} closeMenu={closeMenu} openModal={openModal} handleDelete={() => {removeTask(taskData.id);}}/> : null }
            <p className="task-description">{taskData.description}</p>
            <span className="task-deadline">{taskData.deadline ? getDateString(new Date(taskData.deadline)) : 'No deadline'}</span>
            <span className="task-priority">{formatPriority(taskData.priority)}</span>
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