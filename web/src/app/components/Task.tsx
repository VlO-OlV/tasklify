import '../../assets/styles/Task.css';

function Task(props: any) {
    return (
        <div className="task">
            <div className="task-header">
                <h3 className="task-title">Task</h3>
                <button className="task-menu"></button>
            </div>
            <p className="task-description">Lorem ipsum dolor it amet Lorem ipsum dolor it amet Lorem ipsum dolor it amet</p>
            <span className="task-deadline">Wed, 19 Apr</span>
            <span className="task-priority">Low</span>
            <div className="task-dropdown">
                <span className="task-dropdown-button">Move to:</span>
                <div className="task-dropdown-content">
                    <button className="task-dropdown-content-button">First</button>
                    <button className="task-dropdown-content-button">Second</button>
                    <button className="task-dropdown-content-button">Third</button>
                </div>
            </div>
        </div>
    );
}

export default Task;