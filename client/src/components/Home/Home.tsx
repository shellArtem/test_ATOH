import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Status from '../Status/Status';

export default function Login() {
  const user = useSelector((state: any) => state.UserReducer.name);
  const dispatch = useDispatch();

  const initState = {
    login: '',
    password: '',
  };

  const [log, setLog] = useState(initState);

  const logInputHandler = (e) => {
    setLog((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const logSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const responce = await fetch('http://localhost:3003/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(log),
        credentials: 'include',
      });
      const data = await responce.json();
      dispatch({ type: 'LOG_USER', payload: data.name });
    } catch (error) {
      console.log('login error', error);
    }
  };

  const [clients, setClients] = useState([]);

  useEffect(() => {
    (async function () {
      const response = await fetch('http://localhost:3003/client', {
        credentials: 'include',
      });
      const result = await response.json();
      setClients(result);
    })();
  }, []);

  return (
    <>
      {user ? (
        clients.map((client) => (
          <div key={client.id} style={{ marginTop: '100px' }}>
            <p>
              {' '}
              ФИО: {client.surname} {client.name} {client.patronymic}{' '}
            </p>
            <p> Номер счета: {client.accountNumber} </p>
            <p>Дата Рождения: {new Date(client.date_of_birth).toLocaleDateString()}</p>
            <p>ИНН: {client.TIN}</p>
            <p>
              Статус:
              <Status key={client.id} client={client} />
            </p>
          </div>
        ))
      ) : (
        <form onSubmit={logSubmitHandler}>
          <input
            onChange={logInputHandler}
            value={log.login}
            name="login"
            type="text"
            placeholder="Введите логин"
          />
          <input
            onChange={logInputHandler}
            value={log.password}
            name="password"
            type="text"
            placeholder="Введите пароль"
          />
          <button>Войти</button>
        </form>
      )}
    </>
  );
}
