import Task from "./Task";
import '../../assets/styles/List.css';
import Menu from "./Menu";
import { useState } from "react";

function List(props: any) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const [isEditingMode, setIsEditingMode] = useState(false);

    return (
        <div className="list">
            {
                isEditingMode ?
                    <form action="" method="post" className="list-header list-header_form">
                        <input type="text" name="name" placeholder="List name" defaultValue={props.name} />
                        <div>
                            <button type="button" className="form_button button-cancel" onClick={() => {setIsEditingMode(false);}}></button>
                            <button type="submit" className="form_button button-submit"></button>
                        </div>
                    </form>
                :
                    <div className="list-header">
                        <h3 className="list-title">{props.name}</h3>
                        <div>
                            <p>45</p>
                            <button className="list-menu" onClick={() => {setIsMenuVisible(!isMenuVisible)}}></button>
                        </div>
                    </div>
            }
            <Menu isList={true} enterEditMode={() => {setIsEditingMode(true)}} isOpened={isMenuVisible} closeMenu={() => {setIsMenuVisible(false);}} />
            <button className="list-add-task" onClick={() => {props.openModal(3);}}>Add new card</button>
            <Task name={"First"} description={"Lorem ipsum dolor sit amet"} deadline={"Mon, 1 April"} priority={"Low"} openModal={props.openModal} />
            <Task name={"Second"} description={"Lorem ipsum dolor sit amet"} deadline={"Tue, 23 June"} priority={"Extreme"} openModal={props.openModal} />
            <Task name={"Third"} description={"Lorem ipsum dolor sit amet"} deadline={"Fri, 11 November"} priority={"Medium"} openModal={props.openModal} />
            <Task name={"Fourth"} description={"Lorem ipsum dolor sit amet"} deadline={"Sun, 31 December"} priority={"High"} openModal={props.openModal} />
        </div>
    );
}

export default List;