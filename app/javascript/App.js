import React from 'react';

import store from './store';
import { Provider } from 'react-redux';
import TaskBoard from 'containers/TaskBoard';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';

const theme = createTheme();

const App = () => {
  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>
        <TaskBoard />
      </MuiThemeProvider>
    </Provider>
  );
};

export default App;
