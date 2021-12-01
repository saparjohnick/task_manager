import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

const UserPresenter = new PropTypesPresenter(
  {
    id: PropTypes.number,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  },
  {
    fullName(user) {
      return `${this.firstName(user)} ${this.lastName(user)}`;
    },
  }
);

export default UserPresenter;
