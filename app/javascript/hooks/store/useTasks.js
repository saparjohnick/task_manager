import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/tasksSlice';
import { STATES } from 'presenters/TaskPresenter';

const useTasks = () => {
  const board = useSelector((state) => state.tasksSlice.board);
  const { loadBoard } = useTasksActions();

  // const loadBoard = () => Promise.all(loadBoard);

  return {
    board,
    loadBoard,
  };
};

export default useTasks;
