import BoardCard from './BoardCard';
import '../../assets/styles/BoardsBlock.css';
import { useGetMyBoardUsersQuery } from '../store/api/endpoints/boardUsersApi';
import { BoardUser } from '../types/BoardUser';
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';

function BoardsBlock () {

  const {
    data,
    isFetching: isBoardUsersFetching,
    refetch: refetchBoardUsers,
    error: fetchBoardUsersError,
  } = useGetMyBoardUsersQuery();

  const { showMessage } = useToastContext();

  const boardUsers: BoardUser[] = data as BoardUser[];

  const renderBoards = (boardUsers: BoardUser[]) => {
    const boardBlocks = boardUsers.map((boardUser) => (<BoardCard boardId={boardUser.boardId} userRole={boardUser.userRole} refetchBoards={refetchBoardUsers} />))
    return boardBlocks;
  }

  if (fetchBoardUsersError) {
    showMessage(getErrorMsg(fetchBoardUsersError));
    return (<></>);
  }
  
  return (
    <div className="boards-block">
      {
        !isBoardUsersFetching && renderBoards(boardUsers)
      }
    </div>
  );
}

export default BoardsBlock;