import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';
import UserPresenter from 'presenters/UserPresenter';

const TaskPresenter = new PropTypesPresenter(
  {
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
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
