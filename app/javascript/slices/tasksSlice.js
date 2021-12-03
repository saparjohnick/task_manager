import { propEq } from 'ramda';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { changeColumn } from '@asseinfo/react-kanban';

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
  },
});

const { loadColumnSuccess } = tasksSlice.actions;

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

  const createTask = (params, page = 1, perPage = 10) => {
    const attributes = TaskForm.attributesToSubmit(params);
    return TasksRepository.create(attributes).then(({ data }) => {
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
    // .catch((error) => {
    //   alert(`Move failed! ${error.message}`);
    // });
  };

  const loadTask = (id) => {
    return TasksRepository.show(id).then(({ data: { task } }) => task);
  };

  const updateTask = (task) => {
    const attributes = TaskForm.attributesToSubmit(task);

    return TasksRepository.update(TaskPresenter.id(task), attributes).then(
      () => {
        loadColumnInitial(TaskPresenter.state(task));
      }
    );
  };

  const destroyTask = (task) => {
    return TasksRepository.destroy(TaskPresenter.id(task)).then(() => {
      loadColumnInitial(TaskPresenter.state(task));
    });
  };

  return {
    loadBoard,
    createTask,
    dragEndCard,
    loadTask,
    updateTask,
    destroyTask,
  };
};

export default tasksSlice.reducer;
