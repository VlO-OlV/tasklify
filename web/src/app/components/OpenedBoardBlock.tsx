import { useParams } from 'react-router-dom';
import '../../assets/styles/OpenedBoardBlock.css';
import { useToastContext } from '../hooks/contexts/ToastContext';
import { List } from '../types/List';
import getErrorMsg from '../utils/getErrorMsg';
import ListBlock from './ListBlock';
import { useGetBoardListsQuery } from '../store/api/endpoints/boardsApi';
import { useCreateListMutation } from '../store/api/endpoints/listsApi';

function OpenedBoardBlock () {
  const { boardId } = useParams();

  const { 
    data,
    isFetching: isListsFetching,
    refetch: refetchLists,
    error: fetchListsError,
  } = useGetBoardListsQuery(boardId as string);

  const [ createList ] = useCreateListMutation();

  const lists: List[] = data as List[];

  const { showMessage } = useToastContext();

  const addList = async () => {
    createList({name: 'New List', boardId: boardId as string})
      .unwrap()
      .then(() => {
        refetchLists();
      })
      .catch((error) => {
        showMessage(getErrorMsg(error));
      });
  }

  function renderLists(lists: List[]): React.ReactElement[] {
    const listBlocks = lists.map((list) => <ListBlock listData={list} refetchLists={refetchLists}/>)
    listBlocks.push(<button className="button-list" onClick={addList}>Create new list</button>);
    return listBlocks;
  }

  if (fetchListsError) {
    showMessage(getErrorMsg(fetchListsError));
    return (<></>);
  }

  return (
    <div className="lists-block">
      {!isListsFetching && renderLists(lists)}
    </div>
  );
}

export default OpenedBoardBlock;