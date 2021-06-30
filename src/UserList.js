import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

import './pagination.css';

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
  const [offset, setOffset] = useState(0);
  const [perPageState] = useState(10);
  const [pageCountState, setPageCountState] = useState(0);

  const handleDelete = useCallback(async (email, index) => {
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
  }, [userListState]);

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    setOffset(selectedPage * perPageState);
  };

  const getUsers = useCallback(async () => {
    try {
      const resp = await axios.get(`${process.env.REACT_APP_API}/users`);
      const slice = resp.data.data.get.slice(offset, offset + perPageState);
      setUserListState(slice);
      setPageCountState(Math.ceil(resp.data.data.get.length / perPageState));

    } catch (e) {
      if (e.response) {
        console.error('Um erro interno ocorreu: ', e.response);
      } else if (e.request) {
        console.error('O cliente nunca recebeu uma resposta: ', e);
      } else {
        console.error('Ocorreu algum erro inesperado: ', e);
      }
    }
  }, [offset, perPageState]);

  useEffect(() => {
    getUsers();
  }, [offset, getUsers]);

  return (
    <>
      {userListState.length !== 0 ?
        <>
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

        </>
      : <H4>Nenhum usuário cadastrado</H4>
      }

      <ReactPaginate
        pageCount={pageCountState}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}

        previousLabel={'prev'}
        nextLabel={'next'}
        breakLabel={'...'}
        onPageChange={handlePageClick}

        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        breakClassName={'break-me'}
        activeClassName={'active'} />
    </>
  );
}

export default UserList;
