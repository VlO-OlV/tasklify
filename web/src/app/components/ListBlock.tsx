import TaskBlock from "./TaskBlock";
import '../../assets/styles/List.css';
import Menu from "./Menu";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { Task } from "../slices/tasksSlice";
import { updateListById } from "../slices/listsSlice";

function ListBlock(props: any) {
    const tasks: Task[] = useAppSelector((state) => state.tasks.tasks).filter((task: Task) => task);
    const dispatch = useAppDispatch();

    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false);
    const [currentName, setCurrentName] = useState(props.data.name);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(updateListById({id: props.data.id, name: currentName, numberOfTasks: props.data.numberOfTasks}));
    }

    return (
        <div className="list">
            {
                isEditingMode ?
                    <form action="" className="list-header list-header_form" onSubmit={(e) => {handleSubmit(e);}}>
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
            <Menu isList={true} enterEditMode={() => {setIsEditingMode(true)}} isOpened={isMenuVisible} closeMenu={() => {setIsMenuVisible(false);}} deleteList={() => {props.deleteList(props.data.id);}}/>
            <button className="list-add-task" onClick={() => {props.openModal(3);}}>Add new card</button>
            <TaskBlock name={"First"} description={"Lorem ipsum dolor sit amet"} deadline={"Mon, 1 April"} priority={"Low"} openModal={props.openModal} />
            <TaskBlock name={"Second"} description={"Lorem ipsum dolor sit amet"} deadline={"Tue, 23 June"} priority={"Extreme"} openModal={props.openModal} />
            <TaskBlock name={"Third"} description={"Lorem ipsum dolor sit amet"} deadline={"Fri, 11 November"} priority={"Medium"} openModal={props.openModal} />
            <TaskBlock name={"Fourth"} description={"Lorem ipsum dolor sit amet"} deadline={"Sun, 31 December"} priority={"High"} openModal={props.openModal} />
        </div>
    );
}

export default ListBlock;