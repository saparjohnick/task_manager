import PropTypes from 'prop-types';
import PropTypesPresenter from 'utils/PropTypesPresenter';

const UserPresenter = new PropTypesPresenter(
  {
    id: PropTypes.number,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
  },
  {
    fullName(user) {
      return `${this.first_name(user)} ${this.last_name(user)}`;
    },
  }
);

export default UserPresenter;
