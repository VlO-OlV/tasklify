import { useState } from 'react';
import '../../assets/styles/Modal.css';
import { List } from '../types/List';
import { Task } from '../types/Task';
import { Priority } from '../enums/PriorityEnum';
import { useGetListByIdQuery } from '../store/api/endpoints/listsApi';
import { useCreateTaskMutation, useUpdateTaskByIdMutation } from '../store/api/endpoints/tasksApi';
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';
import getDateString from '../utils/getDateString';
import { formatEnum } from '../utils/formatEnum';

interface ModalProps {
    listId: string,
    taskData: Task,
    mode: number,
    refetchTasks: () => void,
    closeModal: () => void,
    changeMode: (mode: number) => void,
}

function Modal({
    listId,
    taskData,
    mode,
    refetchTasks,
    closeModal,
    changeMode
}: ModalProps) {
    
    const {
        data,
        isFetching: isListFetching,
        error: fetchListError,
    } = useGetListByIdQuery(listId);

    const [updateTask] = useUpdateTaskByIdMutation();
    const [createTask] = useCreateTaskMutation();

    const { showMessage } = useToastContext();

    const currentList: List = data as List;

    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);

    const [taskTitle, setTaskTitle] = useState(mode !== 3 ? taskData.name : null);
    const [taskDeadline, setTaskDeadline] = useState(mode !== 3 ? taskData.deadline : null);
    const [taskPriority, setTaskPriority] = useState(mode !== 3 ? taskData.priority : Priority.LOW);
    const [taskDecription, setTaskDescription] = useState(mode !== 3 ? taskData.description : null);

    const changePriority = (event: any) => {
        setTaskPriority(event.target.value);
        setIsVisibleDropdown(false);
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (mode === 2) {
            const updatedTask = {
                id: taskData.id,
                name: taskTitle as any,
                description: taskDecription as any,
                deadline: taskDeadline as any,
                listId: listId,
                priority: taskPriority as any,
            };
            await updateTask({...updatedTask})
                    .unwrap()
                    .then(() => {
                        refetchTasks();
                        closeModal();
                    })
                    .catch((error) => {
                        showMessage(getErrorMsg(error));
                    });
        } else {
            const newTask = {
                name: taskTitle as any,
                description: taskDecription as any,
                deadline: taskDeadline as any,
                listId: listId,
                priority: taskPriority as any,
            };
            await createTask({...newTask})
                    .unwrap()
                    .then(() => {
                        refetchTasks();
                        closeModal();
                    })
                    .catch((error) => {
                        showMessage(getErrorMsg(error));
                    });
        }
    }

    if (fetchListError) {
        showMessage(getErrorMsg(fetchListError));
        return (<></>);
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <div className="modal-header">
                    <button className="modal-close" onClick={closeModal}></button>
                </div>
                {
                    mode === 1 ? 
                        <div className="modal-body">
                            <div className="modal-body-header">
                                <h2 className="body-header_title">{taskData.name}</h2>
                                <button className="body-header_button button-edit" onClick={() => {changeMode(2);}}>Edit task</button>
                            </div>
                            <div className="modal-body-info">
                                <div className="info_block">
                                    <span className="status_label">Status</span>
                                    <p>{!isListFetching && currentList.name}</p>
                                </div>
                                <div className="info_block">
                                    <span className="deadline_label">Due date</span>
                                    <p>{taskData.deadline ? getDateString(new Date(taskData.deadline)) : 'No deadline'}</p>
                                </div>
                                <div className="info_block">
                                    <span className="priority_label">Priority</span>
                                    <p>{formatEnum(taskData.priority)}</p>
                                </div>
                            </div>
                            <div className="modal-body-description">
                                <h3>Description</h3>
                                <p>{taskData.description}</p>
                            </div>
                        </div>
                    : 
                        <form action='' className="modal-body" onSubmit={(e) => {handleSubmit(e);}}>
                            <div className="modal-body-header">
                                <input type="text" name="title" placeholder="Task title" defaultValue={mode === 2 ? taskData.name : ""} className="title_input" onChange={(e) => {setTaskTitle(e.target.value);}} />
                                {
                                    mode === 2 ?
                                        <button className="body-header_button button-cancel" onClick={() => {changeMode(1);}}>Cancel</button>
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
                                    <input type="datetime-local" name="deadline" className="deadline_input" defaultValue={mode === 2 ? taskData.deadline ? getDateString(new Date(taskData.deadline)) : '' : ''} onChange={(e) => {setTaskDeadline(new Date(e.target.value));}}/>
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
                                            <button type="button" className={isVisibleDropdown ? "select_input_button select_input_button-active" : "select_input_button"} onClick={() => {setIsVisibleDropdown(!isVisibleDropdown)}}>{formatEnum(taskPriority)}</button>
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
                                <textarea placeholder="Description to the task" name="description" defaultValue={mode === 2 ? taskData.description : ""} onChange={(e) => {setTaskDescription(e.target.value);}}></textarea>
                            </div>
                            <div className="modal-body-submit">
                                {
                                    mode === 2 ?
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