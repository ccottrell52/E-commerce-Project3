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
    <div className="">
      <Link to="/signup">
        <button className="button">← Go to Signup</button>
      </Link>

      <h2 className=''>Login</h2>
      <form onSubmit={handleFormSubmit}>
        <div className=''>
          <div className=''>
            <div className=''>
              <label className="" htmlFor="email">Email address:</label>
            </div>
            <div className="">
              <label className="" htmlFor="pwd">Password:</label>
            </div>
          </div>
          <div className=''>
            <div>
              <input
                className=""
                placeholder="youremail@test.com"
                name="email"
                type="email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className=""
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
            <p className="">The provided credentials are incorrect</p>
          </div>
        ) : null}
        <div className=''>
          <button className="button" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
