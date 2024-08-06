import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAction } from '../../../redux/slices/users/usersSlice';
import ErrorMsg from '../../ErrorMsg/ErrorMessage';
import LoadingComponent from '../../LoadingComp/LoadingComponent';
import { Link, useNavigate } from 'react-router-dom';
import '../../../css/LoginPage.css';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
  });
  const { email, name, password } = formData;
  

  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUserAction({ email, name, password }));
  };
  

  const { user, error, loading } = useSelector((state) => state?.users);

  useEffect(() => {
    if (user) {
      navigate("/login");
    }
  }, [navigate, user]);

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sign Up for JPS Streaming</h1>
        <p>Create your account to start watching the latest movies and TV shows</p>
        {error && <ErrorMsg message={error?.message || "Something went wrong. Please try again."} />}
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              name="name"
              type="text"
              id="username"
              value={name}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={onChangeHandler}
              required
            />
          </div>
          {loading ? (
            <LoadingComponent />
          ) : (
            <button type="submit">Sign Up</button>
          )}
        </form>
        <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
