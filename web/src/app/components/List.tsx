import Task from "./Task";
import '../../assets/styles/List.css';

function List(props: any) {
    return (
        <div className="list">
            <div className="list-header">
                <h3 className="list-title">To Do</h3>
                <div>
                    <p>45</p>
                    <button className="list-menu"></button>
                </div>
            </div>
            <button className="list-add-task">Add new card</button>
            <Task />
            <Task />
        </div>
    );
}

export default List;