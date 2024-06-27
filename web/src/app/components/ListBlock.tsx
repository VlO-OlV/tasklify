import TaskBlock from "./TaskBlock";
import '../../assets/styles/List.css';
import Menu from "./Menu";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Task } from "../slices/tasksSlice";
import { deleteListById, updateListById } from "../slices/listsSlice";
import Modal from "./Modal";

function ListBlock(props: any) {
    const tasks: Task[] = useAppSelector((state) => state.tasks.tasks).filter((task: Task) => task.listId === props.data.id);
    const dispatch = useAppDispatch();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [currentName, setCurrentName] = useState(props.data.name);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState(1);
    const [viewedTask, setViewedTask] = useState({});

    function updateListName(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(updateListById({id: props.data.id, name: currentName, numberOfTasks: props.data.numberOfTasks}));
        setIsEditingMode(false);
    }

    function openModal(mode: number) {
        setModalMode(mode);
        setIsModalVisible(true);
    }

    function deleteList(listId: string) {
        dispatch(deleteListById(listId));
    }

    function renderTasks(tasks: Task[]): React.ReactElement[] {
        const taskBlocks = tasks.map((task) => <TaskBlock data={task} openModal={openModal} toggleTask={() => {setViewedTask(task);}} />);
        return taskBlocks;
    }

    return (
        <div className="list">
            {
                isEditingMode ?
                    <form action="" className="list-header list-header_form" onSubmit={(e) => {updateListName(e);}}>
                        <input type="text" name="name" placeholder="List name" defaultValue={props.data.name} onChange={(e) => {setCurrentName(e.target.value);}} />
                        <div>
                            <button type="button" className="form_button button-cancel" onClick={() => {setIsEditingMode(false);}}></button>
                            <button type="submit" className="form_button button-submit"></button>
                        </div>
                    </form>
                :
                    <div className="list-header">
                        <h3 className="list-title">{props.data.name}</h3>
                        <div>
                            <p>{props.data.numberOfTasks}</p>
                            <button className="list-menu" onClick={() => {setIsMenuVisible(!isMenuVisible)}}></button>
                        </div>
                    </div>
            }
            <Menu isList={true} enterEditMode={() => {setIsEditingMode(true)}} isOpened={isMenuVisible} closeMenu={() => {setIsMenuVisible(false);}} deleteList={() => {deleteList(props.data.id);}}/>
            <button className="list-add-task" onClick={() => {openModal(3);}}>Add new card</button>
            {renderTasks(tasks)}
            { isModalVisible ? <Modal closeModal={() => {setIsModalVisible(false);}} changeMode={(mode: number) => {setModalMode(mode);}} mode={modalMode} listId={props.data.id} data={viewedTask} /> : null }
        </div>
    );
}

export default ListBlock;