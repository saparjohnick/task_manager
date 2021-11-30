import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

const TaskPresenter = new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    state: PropTypes.string,
    author: PropTypes.object,
    assignee: PropTypes.object,
  },
  {
    fullTitle(task) {
      return `Task # ${this.id(task)} [${this.name(task)}]`;
    },
  }
);

export default TaskPresenter;

export const STATES = [
  { key: 'new_task', value: 'New' },
  { key: 'in_development', value: 'InDev' },
  { key: 'in_qa', value: 'In QA' },
  { key: 'in_code_review', value: 'In CR' },
  { key: 'ready_for_release', value: 'Ready For Release' },
  { key: 'released', value: 'Released' },
  { key: 'archived', value: 'Archived' },
];
