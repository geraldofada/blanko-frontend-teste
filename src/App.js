import { createGlobalStyle } from 'styled-components';

import 'normalize.css';

import Table from './Table';

const GlobalStyle = createGlobalStyle`
  * {
    font-family: Roboto, Helvetica, Arial, sans-serif
  }
`;

const App = () => {
  return (
    <>
      <GlobalStyle />
      <header>
        <h1>Teste</h1>
      </header>

      <Table />
    </>
  );
}

export default App;
