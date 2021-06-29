import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import 'normalize.css';

import Home from './Home';
import UserCreate from './UserCreate';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Roboto, Helvetica, Arial, sans-serif;
    margin: 0px;
  }
  button {
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
`;

const App = () => {
  return (
    <Wrapper>
      <GlobalStyle />

      <BrowserRouter>
        <Switch>
          <Route path='/' exact> <Home/> </Route>
          <Route path='/user/create'> <UserCreate/> </Route>
          <Route path='/user/update'> <UserCreate/> </Route>
        </Switch>
      </BrowserRouter>

    </Wrapper>
  );
}

export default App;
