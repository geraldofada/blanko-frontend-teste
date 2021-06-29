import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Table = styled.table`
  margin-top: 50px;
  border: 1px solid #f2f2f2;
  border-collapse: collapse;

  th, td {
    padding: 8px;
  }

  th {
    background-color: #f2f2f2;
    text-align: left;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const Action = styled.button`
  background-color: transparent;
  border: none;

  &:hover {
    color: ${props => props.color};
  }
`;

const H4 = styled.h4`
  margin-top: 50px;
`;

const UserList = () => {
  const [userListState, setUserListState] = useState([]);

  const getUsers = async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API}/users`);
      setUserListState(resp.data.data.get);

    } catch (e) {
      if (e.response) {
        console.error('Um erro interno ocorreu: ', e.response);
      } else if (e.request) {
        console.error('O cliente nunca recebeu uma resposta: ', e);
      } else {
        console.error('Ocorreu algum erro inesperado: ', e);
      }
    }
  };

  const handleDelete = async (email, index) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API}/users`, {
        data: {
          email
        }
      });

      let userlist = [...userListState];
      userlist.splice(index, 1);
      setUserListState(userlist);
    } catch (e) {
      if (e.response) {
        console.error('Um erro interno ocorreu: ', e.response);
      } else if (e.request) {
        console.error('O cliente nunca recebeu uma resposta: ', e);
      } else {
        console.error('Ocorreu algum erro inesperado: ', e);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {userListState.length !== 0 ?
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {userListState.map((user, index) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Link to={`/user/update/${user.id}`}>
                      <Action color='#5bc0de' type='button'>Editar</Action>
                    </Link>
                    <Action
                      color='#d9534f'
                      type='button'
                      onClick={e => handleDelete(user.email, index)}>Excluir</Action>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      : <H4>Nenhum usuário cadastrado</H4>
      }
    </>
  );
}

export default UserList;
