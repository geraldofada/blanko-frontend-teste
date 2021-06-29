import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const UserCreate = () => {
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError(null);
    setFormSuccess(null);

    const name = event.target.name.value;
    const email = event.target.email.value;

    try {
      await axios.post(
        `${process.env.REACT_APP_API}/users`,
        {
          name,
          email
        }
      );
      event.target.name.value = '';
      event.target.email.value = '';
      setFormSuccess(`O usuário ${email} foi cadastrado.`)

    } catch (e) {
      if (e.response) {
        const resp = e.response;

        if (resp.data.status === 'fail') {
          setFormError(Object.values(resp.data.data));
        } else if (resp.data.status === 'error') {
          console.error('Um erro interno ocorreu: ', e.response);
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
      <h2>Cadastrar Usuário</h2>

      {formError ?
        <Errors>
          {formError.map(err => <li key={err}>{err}</li>)}
        </Errors>
        : null
      }

      {formSuccess ?
        <Success>
          {formSuccess}
        </Success>
        : null
      }

      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor='name'>Nome</label>
        <input type='text' name='name'/>

        <label htmlFor='email'>Email</label>
        <input type='text' name='email'/>

        <Nav>
          <Link to="/">
            <button type='button'>Voltar</button>
          </Link>

          <button type='submit'>Cadastrar</button>
        </Nav>

      </form>
    </Wrapper>
  );
};

export default UserCreate;
