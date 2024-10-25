import '../../assets/styles/Menu.css'

interface MenuProps {
    enterEditMode?: () => void,
    openModal?: (mode: number) => void,
    handleDelete: () => void,
    closeMenu: () => void,
    isList: boolean,
}

function Menu({
    enterEditMode = () => {},
    openModal = () => {},
    handleDelete,
    closeMenu,
    isList,
}: MenuProps) {
    
    function handleEditClick() {
        if (isList) {
            enterEditMode();
        } else {
            openModal(2);
        }
        closeMenu();
    }

    function handleDeleteClick() {
        handleDelete();
        closeMenu();
    }

    return (
        <div className={isList ? "menu menu-list" : "menu menu-task"} onClick={(e) => {e.stopPropagation();}}>
            <button className="menu-button-edit" onClick={handleEditClick}>Edit</button>
            <button className="menu-button-delete" onClick={handleDeleteClick}>Delete</button>
        </div>
    );
}

export default Menu;