import React from 'react';
import Header from './components/Header';
import Main from './components/Main';
import { Provider } from './utils/Context';

const App = () => {
  return (
    <Provider>
      <div className='bg-[#F3F3E9] h-screen flex flex-col'>
        <Header />
        <Main />
      </div>
    </Provider>
  );
};

export default App;
