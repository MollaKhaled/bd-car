import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import NavBar from '../../shared/NavBar/NavBar';

import logImg from "../../assets/images/login/login.svg"
import SocialLogin from '../../shared/SocialLogin/SocialLogin';


const Login = () => {
  const { signIn } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';


  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate(from, {replace:true})

        
      })
      .catch(error => {
        console.log(error);
      })

  }
  
  return (
    <div>
      <NavBar></NavBar>

      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex ">
          <div className='w-1/2 mr-28'>
            <img src={logImg} alt="" />
          </div>
          <div className="card bg-base-100     max-w-sm shrink-0 shadow-2xl w-1/2">
            <h1 className="text-4xl font-bold mb-4 mt-4 text-center ">Please Login!</h1>
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <label className="label mb-4 ml-8">
              <Link to='/register' className="label-text-alt link link-hover">New to Please Register </Link>
            </label>
            <div className='inline'>
              <SocialLogin></SocialLogin>
             
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};

export default Login;