import { useSelector } from 'react-redux';
import { useTasksActions } from 'slices/tasksSlice';

const useTasks = () => {
  const board = useSelector((state) => state.tasksSlice.board);
  const {
    loadBoard,
    loadColumn,
    loadColumnMore,
    createTask,
    dragEndCard,
    loadTask,
    updateTask,
    destroyTask,
  } = useTasksActions();

  return {
    board,
    loadBoard,
    loadColumn,
    loadColumnMore,
    createTask,
    dragEndCard,
    loadTask,
    updateTask,
    destroyTask,
  };
};

export default useTasks;
