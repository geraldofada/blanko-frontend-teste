import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Wrapper = styled.div`
  width: 50vw;
  margin-top: 50px;
  margin: 50px auto 0;
  display: flex;
  align-content: center;
  flex-direction: column;

  @media (min-width: 1280px) {
    width: 30vw;
  }

  h2 {
    margin-bottom: 40px;
  }

  form {
    display: flex;
    flex-direction: column;
  }
  form > input {
    margin-bottom: 30px;
  }
  form > button {
    margin-top: 30px;
    width: 100px;
  }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Errors = styled.ul`
  text-decoration: none;
  list-style: none;
  color: red;
  padding: 0;
  margin-bottom: 20px;
`;

const Success = styled.div`
  color: green;
  padding: 0;
  margin-bottom: 20px;
`;

const UserEdit = () => {
  const { id } = useParams();
  const [formErrorState, setFormErrorState] = useState(null);
  const [formSuccessState, setFormSuccessState] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormErrorState(null);
    setFormSuccessState(null);

    const newName = event.target.newName.value;
    const newEmail = event.target.newEmail.value;

    try {
      await axios.put(
        `${process.env.REACT_APP_API}/users`,
        {
          id,
          newEmail: newEmail === '' ? undefined : newEmail,
          newName: newName === '' ? undefined : newName,
        }
      );

      event.target.newName.value = '';
      event.target.newEmail.value = '';
      setFormSuccessState(`O usuário foi atualizado.`)

      event.target.newName.focus();

    } catch (e) {
      if (e.response) {
        const resp = e.response;

        if (resp.data.status === 'fail') {
          setFormErrorState(Object.values(resp.data.data));
        } else if (resp.data.status === 'error') {
          console.error('Um erro interno ocorreu: ', resp);
        }

      } else if (e.request) {
        console.error('O cliente nunca recebeu uma resposta: ', e);

      } else {
        console.error('Ocorreu algum erro inesperado: ', e);
      }
    }
  };

  return (
    <Wrapper>
      <h2>Editar usuário</h2>

      {formErrorState ?
        <Errors>
          {formErrorState.map(err => <li key={err}>{err}</li>)}
        </Errors>
        : null
      }

      {formSuccessState ?
        <Success>
          {formSuccessState}
        </Success>
        : null
      }

      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor='newName'>Novo nome</label>
        <input type='text' name='newName' placeholder='Opcional'/>

        <label htmlFor='newEmail'>Novo email</label>
        <input type='text' name='newEmail' placeholder='Opcional'/>

        <Nav>
          <Link to="/">
            <button type='button'>Voltar</button>
          </Link>

          <button type='submit'>Atualizar</button>
        </Nav>

      </form>
    </Wrapper>
  );
};

export default UserEdit;
