import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider, connect } from 'react-redux'
import App from './src';
import { theme } from './src/core/theme';
import { createStore, comibineReducers } from 'redux'
import { AppRegistry } from 'react-native'
import rootReducer from './src/reducers'

const store = createStore(rootReducer);

const Main = () => (
  <PaperProvider theme={theme} >
    <Provider store={store}>
      <App />
    </Provider>
  </PaperProvider>
);

AppRegistry.registerComponent('drffg', () => Main)
export default Main;
