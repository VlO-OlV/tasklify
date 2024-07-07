import TaskBlock from "./TaskBlock";
import '../../public/styles/List.css';
import Menu from "./Menu";
import { useState } from "react";
import Modal from "./Modal";
import { Task } from "../types/Task";
import { useGetAllTasksQuery } from "../store/api/endpoints/tasksApi";
import { useDeleteListByIdMutation, useUpdateListByIdMutation } from "../store/api/endpoints/listsApi";

function ListBlock(props: any) {
    const {data, isFetching, refetch: refetchTasks} = useGetAllTasksQuery();
    
    const [updateList] = useUpdateListByIdMutation();
    const [deleteList] = useDeleteListByIdMutation();

    const tasks: Task[] = data?.filter((task: Task) => task.listId === props.data.id) as Task[];

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [currentName, setCurrentName] = useState(props.data.name);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMode, setModalMode] = useState(1);
    const [viewedTask, setViewedTask] = useState({});

    const updateListName = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateList({id: props.data.id, name: currentName})
                .unwrap()
                .then(() => {
                    props.refetchLists();
                });
        setIsEditingMode(false);
    }

    const openModal = (mode: number) => {
        setModalMode(mode);
        setIsModalVisible(true);
    }

    const renderTasks = (tasks: Task[]): React.ReactElement[] => {
        const taskBlocks = tasks.map((task) => <TaskBlock data={task} openModal={openModal} toggleTask={() => {setViewedTask(task);}} refetchTasks={refetchTasks} />);
        return taskBlocks;
    }

    const handleDelete = async (listId: string) => {
        await deleteList({id: listId})
                .unwrap()
                .then(() => {
                    props.refetchLists();
                });
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
                            <p>{!isFetching && tasks.length}</p>
                            <button className="list-menu" onClick={() => {setIsMenuVisible(!isMenuVisible)}}></button>
                        </div>
                    </div>
            }
            <Menu isList={true} enterEditMode={() => {setIsEditingMode(true)}} isOpened={isMenuVisible} closeMenu={() => {setIsMenuVisible(false);}} handleDelete={() => {handleDelete(props.data.id);}}/>
            <button className="list-add-task" onClick={() => {openModal(3);}}>Add new card</button>
            {!isFetching && renderTasks(tasks)}
            { isModalVisible ? <Modal closeModal={() => {setIsModalVisible(false);}} changeMode={(mode: number) => {setModalMode(mode);}} refetchTasks={refetchTasks} mode={modalMode} listId={props.data.id} data={viewedTask} /> : null }
        </div>
    );
}

export default ListBlock;