import { useState } from 'react';
import '../../assets/styles/Modal.css';

function Modal(props: any) {
    const [isVisibleDropdown, setIsVisibleDropdown] = useState(false);
    const [priorityOption, setPriorityOption] = useState("High");

    function changePriority(event: any) {
        setPriorityOption(event.target.value);
        setIsVisibleDropdown(false);
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
                                <h2 className="body-header_title">Task name</h2>
                                <button className="body-header_button button-edit" onClick={() => {props.changeMode(2);}}>Edit task</button>
                            </div>
                            <div className="modal-body-info">
                                <div className="info_block">
                                    <span className="status_label">Status</span>
                                    <p>In progress</p>
                                </div>
                                <div className="info_block">
                                    <span className="deadline_label">Due date</span>
                                    <p>Wed, 29 April</p>
                                </div>
                                <div className="info_block">
                                    <span className="priority_label">Priority</span>
                                    <p>Low</p>
                                </div>
                            </div>
                            <div className="modal-body-description">
                                <h3>Description</h3>
                                <p>Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet</p>
                            </div>
                        </div>
                    : 
                        <form action='' method='post' className="modal-body">
                            <div className="modal-body-header">
                                <h2 className="body-header_title">Task name</h2>
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
                                    <p>In progress</p>
                                </div>
                                <div className="info_block">
                                    <label htmlFor="deadline" className="deadline_label">Due date</label>
                                    <input type="datetime-local" name="deadline"/>
                                </div>
                                <div className="info_block">
                                    <label htmlFor="priority" className="priority_label">Priority</label>
                                    <div className="priority_select">
                                        <select value={priorityOption} name="priority">
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                            <option value="Extreme">Extreme</option>
                                        </select>
                                        <div className="select_input">
                                            <button type="button" className={isVisibleDropdown ? "select_input_button select_input_button-active" : "select_input_button"} onClick={() => {setIsVisibleDropdown(!isVisibleDropdown)}}>{priorityOption}</button>
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
                                <textarea placeholder="Description to the task" name="description"></textarea>
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