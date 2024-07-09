// LoginPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUserAction } from '../../../redux/slices/users/usersSlice';
import ErrorMsgPortal from '../../ErrorMsg/ErrorMessage';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import '../../../css/LoginPage.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChangeHandler = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUserAction({ email, password }));
  };

  //get data from store
  const { error, loading, userInfo } = useSelector(
    (state) => state?.users?.userAuth
  );

  //redirect
  useEffect(() => {
    if (userInfo?.status.toLowerCase() === "success") {
      navigate("/home");
    } else {
      console.log("user not found");
    }
  }, [userInfo, navigate]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Welcome to JPS Streaming</h1>
        {error && <ErrorMsgPortal message={error?.message} />}
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              name='email'
              type="email"
              id="email"
              value={email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              name='password'
              type="password"
              id="password"
              value={password}
              onChange={onChangeHandler}
              required
            />
          </div>
          { loading ? (
            <LoadingComponent />
          ) : (
            <button type="submit">Login</button>
          )}
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;