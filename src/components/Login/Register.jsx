import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import NavBar from '../../shared/NavBar/NavBar';
import logImg from "../../assets/images/login/login.svg"
import SocialLogin from '../../shared/SocialLogin/SocialLogin';

const Register = () => {
 const {createUser, user} =  useContext(AuthContext)
 
  const handleRegister = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    console.log(name, email, password);

    createUser(email, password)
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser);
     
      form.reset();
    })
    .catch(error =>{
      console.log(error);
    })
  }
  return (
    <div>
      <NavBar></NavBar>
    <div className="hero bg-base-200 min-h-screen">
<div className="hero-content flex">
<div className='w-1/2 mr-28'>
           <img src={logImg} alt="" />
        </div>
  <div className="card bg-base-100 w-1/2 max-w-sm shrink-0  shadow-2xl">
  
  <h1 className="text-4xl font-bold mb-4 mt-4 text-center ">Please Register!</h1>
  
    <form onSubmit={handleRegister} className="card-body">
      <div className="form-control">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input type="text" name='name' placeholder="name" className="input input-bordered" required />
      </div>
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
        <button className="btn btn-primary">Register</button>
      </div>
    </form>
    <label className="label mb-4 ml-8">
            <Link to='/login' className="label-text-alt link link-hover">Already have an account? Please Login </Link>
        </label>
        <SocialLogin></SocialLogin>
  </div>
</div>
</div>
  </div>
  );
};

export default Register;