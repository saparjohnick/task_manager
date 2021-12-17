import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';
import _ from 'lodash';

import TaskPresenter, { STATES } from 'presenters/TaskPresenter';
import TaskForm from 'forms/TaskForm';
import TasksRepository from 'repositories/TasksRepository';

const initialState = {
  board: {
    columns: STATES.map((column) => ({
      id: column.key,
      title: column.value,
      cards: [],
      meta: {},
    })),
  },
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    loadColumnSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: items,
        meta,
      });
      return state;
    },
    loadColumnMoreSuccess(state, { payload }) {
      const { items, meta, columnId } = payload;
      const column = state.board.columns.find(propEq('id', columnId));

      state.board = changeColumn(state.board, column, {
        cards: column.cards.concat(items),
        meta,
      });
      return state;
    },
  },
});

const { loadColumnSuccess, loadColumnMoreSuccess } = tasksSlice.actions;

export const useTasksActions = () => {
  const dispatch = useDispatch();

  const loadColumn = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnSuccess({ ...data, columnId: state }));
    });
  };

  const loadBoard = () => STATES.map(({ key }) => loadColumn(key));

  const loadColumnMore = (state, page = 1, perPage = 10) => {
    TasksRepository.index({
      q: { stateEq: state },
      page,
      perPage,
    }).then(({ data }) => {
      dispatch(loadColumnMoreSuccess({ ...data, columnId: state }));
    });
  };

  const createTask = (params, page = 1, perPage = 10) => {
    const attributes = TaskForm.attributesToSubmit(params);
    const NEW_TASK_COLUMN = 'new_task';

    return TasksRepository.create(attributes).then(({ data }) => {
      loadColumn(NEW_TASK_COLUMN);
      dispatch(
        loadColumnSuccess({
          ...data,
          columnId: state,
        })
      );
    });
  };

  const dragEndCard = (task, source, destination) => {
    const transition = task.transitions.find(
      ({ to }) => destination.toColumnId === to
    );
    if (!transition) {
      return null;
    }

    return TasksRepository.update(TaskPresenter.id(task), {
      task: { stateEvent: transition.event },
    }).then(({ data }) => {
      loadColumn(destination.toColumnId);
      loadColumn(source.fromColumnId);
    });
  };

  const loadTask = (id) => {
    return TasksRepository.show(id);
  };

  const updateTask = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(TaskPresenter.id(task), attributes).then(
      () => {
        loadColumn(TaskPresenter.state(task));
      }
    );
  };

  const destroyTask = (task) => {
    return TasksRepository.destroy(TaskPresenter.id(task)).then(() => {
      loadColumn(TaskPresenter.state(task));
    });
  };

  return {
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

export default tasksSlice.reducer;
