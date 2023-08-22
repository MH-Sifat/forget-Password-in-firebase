import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const auth = getAuth()

const Login = () => {

  const [success,setSuccess] = useState(false);
  const [error,setError] = useState("");
  const [userEmail,setUserEmail]= useState('');



    const handleLogin = (event) => {
       setSuccess(false)
        event.preventDefault()
        const from = event.target;
         const email = from.email.value;
        const password = from.password.value;
        console.log(email,password);
        signInWithEmailAndPassword(auth,email,password)
        .then(result =>{
          const user = result.user;
          console.log(user);

          setSuccess(true)
           
          from.reset();
          setError('')

      }).catch(error =>{
          setError(error.message)
          console.log(error);
      })
      
    }
    
    const handleEmailBlur =event=>{
      const email = event.target.value;
      setUserEmail(email);
      console.log(email);

    }

    const handleForgetPassword=()=>{
      if(!userEmail){
        alert('please enter your e-mail')
        return;
      }
      sendPasswordResetEmail(auth,userEmail)
      .then(()=>{
        alert('please check your mail,and reset password')
      })
      .catch(error=>{
        console.log(error);
      })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-3xl font-bold my-4">Please LogIn now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleLogin} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input onBlur={handleEmailBlur} type="email" name='email' placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" />
          <label className="label">
            <Link to='/register' className="label-text-alt link link-hover">Don't have an Account?Register Now</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">LogIn</button>
        </div>
        {
            success && <p className='text-green-500'>LogIn Successfull.</p>
        }
        <p className='text-red-600'>{error}</p>

      </form>
      <p className="p-2 pt-0 text-center"><small>Forget Password?<button onClick={handleForgetPassword}>Rest password</button></small></p>
      
    </div>
  </div>
</div>
    );
};

export default Login;