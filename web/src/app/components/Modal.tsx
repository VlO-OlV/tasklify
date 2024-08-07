import { useState } from 'react';
import '../../public/styles/Modal.css';
import { List } from '../types/List';
import { CreateTask, Task } from '../types/Task';
import { Priority } from '../enums/PriorityEnum';
import { useGetListByIdQuery } from '../store/api/endpoints/listsApi';
import { useCreateTaskMutation, useUpdateTaskByIdMutation } from '../store/api/endpoints/tasksApi';
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';

function Modal(props: any) {
    const {
        data,
        isFetching: isListFetching,
        error: fetchListError,
    } = useGetListByIdQuery(props.listId);

    const [updateTask] = useUpdateTaskByIdMutation();
    const [createTask] = useCreateTaskMutation();

    const { showMessage } = useToastContext();

    const currentList: List = data as List;

    if (fetchListError) {
        showMessage(getErrorMsg(fetchListError));
    }

    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

    const [taskTitle, setTaskTitle] = useState(props.mode === 2 ? props.data.name : null);
    const [taskDeadline, setTaskDeadline] = useState(props.mode === 2 ? props.data.deadline : null);
    const [taskPriority, setTaskPriority] = useState(props.mode === 2 ? props.data.priority : Priority.LOW);
    const [taskDecription, setTaskDescription] = useState(props.mode === 2 ? props.data.description : null);

    const changePriority = (event: any) => {
        setTaskPriority(event.target.value);
        setIsVisibleDropdown(false);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (props.mode === 2) {
            const updatedTask: Task = {
                id: props.data.id,
                name: taskTitle,
                description: taskDecription,
                deadline: new Date(taskDeadline),
                listId: props.listId,
                priority: taskPriority,
                createdAt: new Date(),
            };
            await updateTask({...updatedTask})
                    .unwrap()
                    .then(() => {
                        props.refetchTasks();
                        props.closeModal();
                    })
                    .catch((error) => {
                        showMessage(getErrorMsg(error));
                    });
        } else {
            const newTask: CreateTask = {
                name: taskTitle,
                description: taskDecription,
                deadline: new Date(taskDeadline),
                listId: props.listId,
                priority: taskPriority,
                createdAt: new Date(),
            };
            await createTask({...newTask})
                    .unwrap()
                    .then(() => {
                        props.refetchTasks();
                        props.closeModal();
                    })
                    .catch((error) => {
                        showMessage(getErrorMsg(error));
                    });
        }
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
                                    <p>{!isListFetching && currentList.name}</p>
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
                                    <p>{!isListFetching && currentList.name}</p>
                                </div>
                                <div className="info_block">
                                    <label htmlFor="deadline" className="deadline_label">Due date</label>
                                    <input type="datetime-local" name="deadline" className="deadline_input" defaultValue={props.mode === 2 ? props.data.deadline : ""} onChange={(e) => {setTaskDeadline(e.target.value);}}/>
                                </div>
                                <div className="info_block">
                                    <label htmlFor="priority" className="priority_label">Priority</label>
                                    <div className="priority_select">
                                        <select value={taskPriority} name="priority">
                                            <option value={Priority.LOW}>Low</option>
                                            <option value={Priority.MEDIUM}>Medium</option>
                                            <option value={Priority.HIGH}>High</option>
                                            <option value={Priority.EXTREME}>Extreme</option>
                                        </select>
                                        <div className="select_input">
                                            <button type="button" className={isVisibleDropdown ? "select_input_button select_input_button-active" : "select_input_button"} onClick={() => {setIsVisibleDropdown(!isVisibleDropdown)}}>{taskPriority}</button>
                                            {
                                                isVisibleDropdown ?
                                                    <div className="select_input_options">
                                                        <button type="button" value={Priority.LOW} onClick={(e) => {changePriority(e);}}>Low</button>
                                                        <button type="button" value={Priority.MEDIUM} onClick={(e) => {changePriority(e);}}>Medium</button>
                                                        <button type="button" value={Priority.HIGH} onClick={(e) => {changePriority(e);}}>High</button>
                                                        <button type="button" className="option_last" value={Priority.EXTREME} onClick={(e) => {changePriority(e);}}>Extreme</button>
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
                            <div className="modal-body-submit">
                                {
                                    props.mode === 2 ?
                                        <input className="form_button-submit" type="submit" value="Update" />
                                    :
                                        <input className="form_button-submit" type="submit" value="Create" />
                                }
                            </div>
                        </form>
                }
            </div>
        </div>
    );
}

export default Modal;