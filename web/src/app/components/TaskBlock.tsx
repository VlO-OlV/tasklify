import { useState } from 'react';
import '../../assets/styles/Task.css';
import Menu from './Menu';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { List, updateListById } from '../slices/listsSlice';
import { Task, updateTaskById } from '../slices/tasksSlice';

function TaskBlock(props: any) {
    const lists: List[] = useAppSelector((state) => state.lists.lists);
    const dispatch = useAppDispatch();

    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
    const [isVisibleOptions, setIsVisibleOptions] = useState(false);

    function closeMenu() {
        setIsVisibleOptions(false);
    }

    function moveTask(targetListId: string) {
        const updatedTask: Task = {
            ...props.data,
            listId: targetListId,
        };
        const currentList: List = lists.find((list) => list.id === props.data.listId) as List;
        const targetList: List = lists.find((list) => list.id === targetListId) as List;
        dispatch(updateTaskById(updatedTask));
        dispatch(updateListById({
            ...currentList,
            numberOfTasks: currentList.numberOfTasks-1,
        }));
        dispatch(updateListById({
            ...targetList,
            numberOfTasks: targetList.numberOfTasks+1,
        }));
    }

    function renderListOptions(lists: List[]): React.ReactElement[] {
        let listOptions = [];
        for (let i = 0; i < lists.length; i++) {
            if (lists[i].id !== props.data.listId) {
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
        <div className="task" onClick={() => {props.openModal(1); props.toggleTask();}}>
            <div className="task-header">
                <h3 className="task-title">{props.data.name}</h3>
                <button className="task-menu" onClick={(e) => {e.stopPropagation(); setIsVisibleOptions(!isVisibleOptions)}}></button>
            </div>
            <Menu isList={false} isOpened={isVisibleOptions} closeMenu={closeMenu} openModal={props.openModal}/>
            <p className="task-description">{props.data.description}</p>
            <span className="task-deadline">{props.data.deadline}</span>
            <span className="task-priority">{props.data.priority}</span>
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