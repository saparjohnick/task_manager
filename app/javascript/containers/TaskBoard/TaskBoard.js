import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Task from 'components/Task';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';
import ColumnHeader from 'components/ColumnHeader';
import TaskPresenter from 'presenters/TaskPresenter';

import useTasks from 'hooks/store/useTasks';
import { useTasksActions } from 'slices/tasksSlice';

import useStyles from './useStyles';

const MODES = {
  ADD: 'add',
  EDIT: 'edit',
  NONE: 'none',
};

const TaskBoard = () => {
  const {
    board,
    loadBoard,
    loadTask,
    loadColumn,
    loadColumnMore,
    createTask,
    dragEndCard,
    updateTask,
    destroyTask,
  } = useTasks();

  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);
  const styles = useStyles();

  useEffect(() => {
    loadBoard();
  }, []);

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setMode(MODES.NONE);
    setOpenedTaskId(null);
  };

  const handleLoadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumnMore(state, page, perPage);
  };

  const handleCardDragEnd = (task, source, destination) => {
    dragEndCard(task, source, destination);
    loadColumn(source);
    loadColumn(destination);
  };

  const handleTaskCreate = (params, page, perPage = 10) => {
    createTask(params);
    handleClose();
  };

  const handleTaskLoad = (id) => {
    return loadTask(id);
  };

  const handleTaskUpdate = (task) => {
    updateTask(task);
    loadColumn(TaskPresenter.state(task));
    handleClose();
  };

  const handleTaskDestroy = (task) => {
    destroyTask(task).then(() => {
      loadColumn(TaskPresenter.state(task));
      handleClose();
    });
  };

  return (
    <>
      <Fab
        onClick={handleOpenAddPopup}
        className={styles.addButton}
        color="primary"
        aria-label="add"
      >
        <AddIcon />
      </Fab>

      <KanbanBoard
        disableColumnDrag
        onCardDragEnd={handleCardDragEnd}
        renderCard={(card) => (
          <Task onClick={handleOpenEditPopup} task={card} />
        )}
        renderColumnHeader={(column) => (
          <ColumnHeader column={column} onLoadMore={handleLoadColumnMore} />
        )}
      >
        {board}
      </KanbanBoard>

      {mode === MODES.ADD && (
        <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />
      )}
      {mode === MODES.EDIT && (
        <EditPopup
          cardId={openedTaskId}
          onLoadCard={handleTaskLoad}
          onCardDestroy={handleTaskDestroy}
          onCardUpdate={handleTaskUpdate}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default TaskBoard;
