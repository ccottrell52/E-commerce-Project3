import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="container my-1">
      <Link to="/signup">
        <button className="button">← Go to Signup</button>
      </Link>

      <h2 className='d-flex justify-content-center'>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className='row'>
          <div className='col p-2'>
            <div className='d-flex flex-row-reverse'>
          <label className="my-2 p-2" htmlFor="email">Email address:</label>
          </div>
          <div className="d-flex flex-row-reverse">
         <label  className=" my-2 p-2" htmlFor="pwd">Password:</label>
         </div>
          </div>
          <div className='col p-2'>
          <div>
          <input
            className="p-2 my-2"
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
          </div>
          <div>
          <input
            className=" p-2 my-2"
            placeholder="******"
            name="password"
            type="password"
            id="pwd"
            onChange={handleChange}
          />
</div>
          </div>


        </div>
      
        {error ? (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className='d-flex justify-content-center'>
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
