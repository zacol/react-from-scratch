import React from 'react';
import { Provider } from 'react-redux';

import { store } from './app/store';

import { Posts } from './features/posts/components/Posts';
import { Users } from './features/users/components/Users';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Posts />
        <Users />
      </div>
    </Provider>
  );
}

export default App;
