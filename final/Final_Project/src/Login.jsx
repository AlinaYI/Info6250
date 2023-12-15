import { useState } from 'react';
import './Form.css';

function LoginForm({ onLogin }) {

  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); 
    if(username) {      
      onLogin(username); 
    }
  }

  return (
      <>
      <div className="login-container">
        <div className='form'>
          <h1 className="title">Login</h1>
          <form action="#/login" onSubmit={onSubmit}>
            <div className='input-field'>
              <input
                type="text"
                className="username"
                name="username"
                value={username}
                onChange={onChange}
                placeholder="Type your username here!"
              />
            </div>
            <button className='btn' type="submit">Login</button>
          </form>

        </div>
      </div>
      </>
      
  );

}

export default LoginForm;
