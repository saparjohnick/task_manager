import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import { propOr } from 'ramda';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import TasksRepository from '../../repositories/TasksRepository';
import Task from 'components/Task';
import ColumnHeader from 'components/ColumnHeader';
import AddPopup from 'components/AddPopup';
import EditPopup from 'components/EditPopup';

import TaskForm from 'forms/TaskForm';

import useStyles from './useStyles';

const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'InDev' },
  { key: 'in_qa', value: 'In QA' },
  { key: 'in_code_review', value: 'In CR' },
  { key: 'ready_for_release', value: 'Ready For Release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];

const initialBoard = {
  columns: STATES.map((column) => ({
    id: column.key,
    title: column.value,
    cards: [],
    meta: {},
  })),
};

const MODES = {
  ADD: 'add',
  NONE: 'none',
  EDIT: 'edit',
};

const TaskBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);
  const [mode, setMode] = useState(MODES.NONE);
  const [openedTaskId, setOpenedTaskId] = useState(null);

  const loadColumn = (state, page, perPage) =>
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    });

  const loadColumnInitial = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => ({
        ...prevState,
        [state]: { cards: data.items, meta: data.meta },
      }));
    });
  };

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    loadColumn(state, page, perPage).then(({ data }) => {
      setBoardCards((prevState) => {
        return {
          ...prevState,
          [state]: {
            cards: prevState[state].cards.concat(data.items),
            meta: data.meta,
          },
        };
      });
    });
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };

  const generateBoard = () => {
    const board = {
      columns: STATES.map(({ key, value }) => ({
        id: key,
        title: value,
        cards: propOr({}, 'cards', boardCards[key]),
        meta: propOr({}, 'meta', boardCards[key]),
      })),
    };

    setBoard(board);
  };

  const handleOpenAddPopup = () => {
    setMode(MODES.ADD);
  };

  const handleOpenEditPopup = (task) => {
    setOpenedTaskId(task.id);
    setMode(MODES.EDIT);
  };

  const handleClose = () => {
    setOpenedTaskId(null);
    setMode(MODES.NONE);
  };

  const handleTaskCreate = (params, page, perPage = 10) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(({ data: { task } }) => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  const handleCardDragEnd = (task, source, destination) => {
    const transition = task.transitions.find(
      ({ to }) => destination.toColumnId === to
    );
    if (!transition) {
      return null;
    }

    return TasksRepository.update(task.id, {
      task: { stateEvent: transition.event },
    })
      .then(() => {
        loadColumnInitial(destination.toColumnId);
        loadColumnInitial(source.fromColumnId);
      })
      .catch((error) => {
        alert(`Move failed! ${error.message}`);
      });
  };

  const loadTask = (id) => {
    return TasksRepository.show(id).then(({ data: { task } }) => task);
  };

  const handleTaskUpdate = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(task.id, attributes).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  const handleTaskDestroy = (task) => {
    return TasksRepository.destroy(task.id).then(() => {
      loadColumnInitial(task.state);
      handleClose();
    });
  };

  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);

  const styles = useStyles();

  return (
    <div>
      <div className={styles.actions}>
        <Fab
          className={styles.addButton}
          color="primary"
          aria-label="add"
          onClick={handleOpenAddPopup}
        >
          <AddIcon />
        </Fab>

        {mode === MODES.ADD && (
          <AddPopup onCreateCard={handleTaskCreate} onClose={handleClose} />
        )}

        {mode === MODES.EDIT && (
          <EditPopup
            onLoadCard={loadTask}
            onCardDestroy={handleTaskDestroy}
            onCardUpdate={handleTaskUpdate}
            onClose={handleClose}
            cardId={openedTaskId}
          />
        )}
      </div>
      <KanbanBoard
        renderCard={(card) => (
          <Task onClick={handleOpenEditPopup} task={card} />
        )}
        renderColumnHeader={(column) => (
          <div>
            <ColumnHeader column={column} onLoadMore={loadColumnMore} />
          </div>
        )}
        onCardDragEnd={handleCardDragEnd}
      >
        {board}
      </KanbanBoard>
    </div>
  );
};

export default TaskBoard;
