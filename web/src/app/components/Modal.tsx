import { useState } from 'react';
import '../../public/styles/Modal.css';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { CreateTask, Task, createTask, updateTaskById } from '../store/slices/tasksSlice';
import { List, updateListById } from '../store/slices/listsSlice';

function Modal(props: any) {
    const currentList: List = useAppSelector((state) => state.lists.lists).find((list) => list.id === props.listId) as List;
    const dispatch = useAppDispatch();

    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

    const [taskTitle, setTaskTitle] = useState(props.mode === 2 ? props.data.name : "");
    const [taskDeadline, setTaskDeadline] = useState(props.mode === 2 ? props.data.deadline : "");
    const [taskPriority, setTaskPriority] = useState(props.mode === 2 ? props.data.priority : "Low");
    const [taskDecription, setTaskDescription] = useState(props.mode === 2 ? props.data.description : "")

    function changePriority(event: any) {
        setTaskPriority(event.target.value);
        setIsVisibleDropdown(false);
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (props.mode === 2) {
            const updatedTask: Task = {
                id: props.data.id,
                name: taskTitle,
                description: taskDecription,
                deadline: taskDeadline,
                listId: props.listId,
                priority: taskPriority,
                createdAt: new Date(),
            };
            dispatch(updateTaskById(updatedTask));
        } else {
            const newTask: CreateTask = {
                name: taskTitle,
                description: taskDecription,
                deadline: taskDeadline,
                listId: props.listId,
                priority: taskPriority,
                createdAt: new Date(),
            };
            dispatch(createTask(newTask));
            dispatch(updateListById({
                ...currentList,
                numberOfTasks: currentList.numberOfTasks+1,
            }));
        }
        props.closeModal();
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <div className="modal-header">
                    <button className="modal-close" onClick={props.closeModal}></button>
                </div>
                {
                    props.mode === 1 ? 
                        <div className="modal-body">
                            <div className="modal-body-header">
                                <h2 className="body-header_title">{props.data.name}</h2>
                                <button className="body-header_button button-edit" onClick={() => {props.changeMode(2);}}>Edit task</button>
                            </div>
                            <div className="modal-body-info">
                                <div className="info_block">
                                    <span className="status_label">Status</span>
                                    <p>{currentList.name}</p>
                                </div>
                                <div className="info_block">
                                    <span className="deadline_label">Due date</span>
                                    <p>{props.data.deadline}</p>
                                </div>
                                <div className="info_block">
                                    <span className="priority_label">Priority</span>
                                    <p>{props.data.priority}</p>
                                </div>
                            </div>
                            <div className="modal-body-description">
                                <h3>Description</h3>
                                <p>{props.data.description}</p>
                            </div>
                        </div>
                    : 
                        <form action='' className="modal-body" onSubmit={(e) => {handleSubmit(e);}}>
                            <div className="modal-body-header">
                                <input type="text" name="title" placeholder="Task title" defaultValue={props.mode === 2 ? props.data.name : ""} className="title_input" onChange={(e) => {setTaskTitle(e.target.value);}} />
                                {
                                    props.mode === 2 ?
                                        <button className="body-header_button button-cancel" onClick={() => {props.changeMode(1);}}>Cancel</button>
                                    :
                                        null
                                }
                            </div>
                            <div className="modal-body-info">
                                <div className="info_block">
                                    <label className="status_label">Status</label>
                                    <p>{currentList.name}</p>
                                </div>
                                <div className="info_block">
                                    <label htmlFor="deadline" className="deadline_label">Due date</label>
                                    <input type="datetime-local" name="deadline" className="deadline_input" defaultValue={props.mode === 2 ? props.data.deadline : ""} onChange={(e) => {setTaskDeadline(e.target.value);}}/>
                                </div>
                                <div className="info_block">
                                    <label htmlFor="priority" className="priority_label">Priority</label>
                                    <div className="priority_select">
                                        <select value={taskPriority} name="priority">
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Extreme">Extreme</option>
                                        </select>
                                        <div className="select_input">
                                            <button type="button" className={isVisibleDropdown ? "select_input_button select_input_button-active" : "select_input_button"} onClick={() => {setIsVisibleDropdown(!isVisibleDropdown)}}>{taskPriority}</button>
                                            {
                                                isVisibleDropdown ?
                                                    <div className="select_input_options">
                                                        <button type="button" value="Low" onClick={(e) => {changePriority(e);}}>Low</button>
                                                        <button type="button" value="Medium" onClick={(e) => {changePriority(e);}}>Medium</button>
                                                        <button type="button" value="High" onClick={(e) => {changePriority(e);}}>High</button>
                                                        <button type="button" className="option_last" value="Extreme" onClick={(e) => {changePriority(e);}}>Extreme</button>
                                                    </div>
                                                :
                                                    null
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-body-description">
                                <h3>Description</h3>
                                <textarea placeholder="Description to the task" name="description" defaultValue={props.mode === 2 ? props.data.description : ""} onChange={(e) => {setTaskDescription(e.target.value);}}></textarea>
                            </div>
                            {
                                props.mode === 2 ?
                                    <input className="form_button-submit" type="submit" value="Update" />
                                :
                                    <input className="form_button-submit" type="submit" value="Create" />
                            }
                        </form>
                }
            </div>
        </div>
    );
}

export default Modal;