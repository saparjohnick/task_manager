import React, { useEffect, useState } from 'react';
import KanbanBoard from '@asseinfo/react-kanban';
import { propOr } from 'ramda';

import Task from 'components/Task';
import TasksRepository from '../../repositories/TasksRepository';
import ColumnHeader from 'components/ColumnHeader';

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
    hideButton: false,
  })),
};

const TaskBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [boardCards, setBoardCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [buttonState, setButtonState] = useState(false);

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
    loadColumn(state, currentPage, perPage).then(({ data }) => {
      if (data.meta.total_pages >= currentPage) {
        setCurrentPage(data.meta.page + 1);
        setBoardCards((prevState) => {
          return {
            ...prevState,
            [state]: {
              cards: prevState[state].cards.concat(data.items),
              meta: data.meta,
            },
          };
        });
      } else {
        setButtonState(true);
      }
    });
  };

  const loadBoard = () => {
    STATES.map(({ key }) => loadColumnInitial(key));
  };

  const generateBoard = () => {
    const board = {
      columns: STATES.map(({ key, value }) => ({
        key: value.toString() + key,
        id: key,
        title: value,
        cards: propOr({}, 'cards', boardCards[key]),
        meta: propOr({}, 'meta', boardCards[key]),
      })),
    };

    setBoard(board);
  };

  useEffect(() => loadBoard(), []);
  useEffect(() => generateBoard(), [boardCards]);

  return (
    <KanbanBoard
      renderCard={(card) => <Task task={card} />}
      renderColumnHeader={(column) => (
        <ColumnHeader
          column={column}
          onLoadMore={loadColumnMore}
          isButtonHidden={buttonState}
        />
      )}
    >
      {board}
    </KanbanBoard>
  );
};

export default TaskBoard;
