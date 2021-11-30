import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  addButton: {
    position: 'fixed',
    bottom: 32,
    right: 32,
  },
  actions: {
    display: 'flex',
    justifyContent: 'right',
  },
}));

export default useStyles;
