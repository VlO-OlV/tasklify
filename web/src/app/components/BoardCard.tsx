import { useEffect, useState } from 'react';
import '../../assets/styles/BoardCard.css';
import { BoardRole } from '../enums/BoardRoleEnum';
import { useToastContext } from '../hooks/contexts/ToastContext';
import { useDeleteBoardByIdMutation, useGetBoardByIdQuery, useUpdateBoardByIdMutation } from '../store/api/endpoints/boardsApi';
import { Board } from '../types/Board';
import { formatEnum } from '../utils/formatEnum';
import getDateString from '../utils/getDateString';
import getErrorMsg from '../utils/getErrorMsg';
import Menu from './Menu';
import { useNavigate } from 'react-router-dom';
import { MenuModes } from '../enums/MenuModesEnum';

interface BoardCardProps {
  boardId: string,
  userRole: BoardRole,
  refetchBoards: () => void,
}

function BoardCard ({ boardId, userRole, refetchBoards }: BoardCardProps) {

  const {
    data,
    isFetching: isBoardFetching,
    refetch: refetchBoard,
    error: fetchBoardError,
  } = useGetBoardByIdQuery(boardId);

  const { showMessage } = useToastContext();

  const board: Board = data as Board;

  const [updateBoard] = useUpdateBoardByIdMutation();
  const [deleteBoard] = useDeleteBoardByIdMutation();

  const navigate = useNavigate();

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isEditingMode, setIsEditingMode] = useState(false);
  const [currentName, setCurrentName] = useState('');

  const updateBoardName = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await updateBoard({ id: boardId, name: currentName})
      .unwrap()
      .then(() => {
        refetchBoard();
        setIsEditingMode(false);
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }

  const removeBoard = async (id: string) => {
    await deleteBoard(id)
      .unwrap()
      .then(() => {
        refetchBoards();
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      })
  }

  const handleDeleteBoard = () => {
    removeBoard(boardId);
    setIsMenuVisible(false);
  }

  const handleEditBoard = () => {
    setIsEditingMode(true);
    setIsMenuVisible(false);
  }

  useEffect(() => {
    if (!isBoardFetching) {
      setCurrentName(board.name);
    }
  }, [isBoardFetching])

  if (fetchBoardError) {
    showMessage(getErrorMsg(fetchBoardError));
    return (<></>);
  }

  return (
    <div className="board-card" onClick={() => {navigate(`/boards/${boardId}`)}}>
      { isMenuVisible ? <Menu menuMode={MenuModes.BOARD} handleDelete={handleDeleteBoard} handleEdit={handleEditBoard}/> : null }
      {
        isEditingMode ?
          <form action="" className="board-card-header board-header_form" onSubmit={(e) => {updateBoardName(e);}} onClick={(e) => {e.stopPropagation();}}>
            <input type="text" name="name" placeholder="Board name" defaultValue={currentName} onChange={(e) => {setCurrentName(e.target.value);}} />
            <div>
              <button type="button" className="form_button button-cancel" onClick={() => {setIsEditingMode(false);}}></button>
              <button type="submit" className="form_button button-submit"></button>
            </div>
          </form>
        :
          <div className="board-card-header">
            <h3>{!isBoardFetching && board.name}</h3>
            <button className="board-menu" onClick={(e) => {e.stopPropagation(); setIsMenuVisible(!isMenuVisible);}}></button>
          </div>
      }
      <div className="board-card-details">
        <p className='board-user-role'>{formatEnum(userRole)}</p>
        <p className='last-updated'>{!isBoardFetching && getDateString(new Date(board.updatedAt))}</p>
      </div>
    </div>
  );
}

export default BoardCard;