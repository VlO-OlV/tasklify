import '../../public/styles/Nav.css';

interface NavProps {
    addList: () => void,
}

function Nav({ addList }: NavProps) {
    return (
        <div className="nav">
            <h1 className="title">My Task Board</h1>
            <div className="buttons-block">
                <button className="button-history">History</button>
                <button className="button-list" onClick={addList}>Create new list</button>
            </div>
        </div>
    );
}
export default Nav;