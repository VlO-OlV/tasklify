import { useState } from 'react';
import '../../assets/styles/Task.css';
import Menu from './Menu';

function TaskBlock(props: any) {
    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
    const [isVisibleOptions, setIsVisibleOptions] = useState(false);

    function closeMenu() {
        setIsVisibleOptions(false);
    }

    return (
        <div className="task" onClick={() => {props.openModal(1);}}>
            <div className="task-header">
                <h3 className="task-title">{props.name}</h3>
                <button className="task-menu" onClick={(e) => {e.stopPropagation(); setIsVisibleOptions(!isVisibleOptions)}}></button>
            </div>
            <Menu isList={false} isOpened={isVisibleOptions} closeMenu={closeMenu} openModal={props.openModal}/>
            <p className="task-description">Lorem ipsum dolor it amet Lorem ipsum dolor it amet Lorem ipsum dolor it amet</p>
            <span className="task-deadline">{props.deadline}</span>
            <span className="task-priority">{props.priority}</span>
            <div className="task-dropdown" onClick={(e) => {e.stopPropagation();}}>
                <button className={ isVisibleDropdown ? "task-dropdown-button task-dropdown-button_active" : "task-dropdown-button"} onClick={ () => {setIsVisibleDropdown(!isVisibleDropdown)} }>Move to:</button>
                { isVisibleDropdown ? 
                <div className="task-dropdown-content">
                    <button className="task-dropdown-content-button">First</button>
                    <button className="task-dropdown-content-button">Second</button>
                    <button className="task-dropdown-content-button lastList">Third</button>
                </div> : null }
            </div>
        </div>
    );
}

export default TaskBlock;