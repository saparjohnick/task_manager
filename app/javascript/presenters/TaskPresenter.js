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
