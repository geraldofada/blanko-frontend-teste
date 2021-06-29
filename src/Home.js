import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import UserList from './UserList';

const Wrapper = styled.div`
  width: 50vw;
  margin: 50px auto 0;
  display: flex;
  align-content: center;
  flex-direction: column;

  @media (min-width: 1280px) {
    width: 30vw;
  }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-content: center;
  align-items: flex-end;
`;

const Home = () => {
  return (
    <Wrapper>
        <Nav>
            <h4>Listagem de usuário</h4>
            <Link to="/user/create">
                <button type='button'>Cadastrar usuário</button>
            </Link>
        </Nav>
        <UserList />
    </Wrapper>
  );

};

export default Home;
