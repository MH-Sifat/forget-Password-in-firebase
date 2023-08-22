import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.init';



const auth = getAuth(app);

const Register = () => {


    const [error,setError] = useState("");
    
    const [success,setSuccess] = useState(false)

    const handleRegistation = (event) => {
        setSuccess(false)

        event.preventDefault()

        const from = event.target;
        const name = from.name.value;
        const email = from.email.value;
        const password = from.password.value;

        if(!/(?=.*[A-Z].*[A-])/.test(password)){
            setError('please provide at least two uppercase')
            return ;
        }
        if(!/(?=.*[@$!%*?&])/.test(password)){
            setError('please give a special charecter');
            return;
        }
        if(password.length < 6){
            setError('password should be at least 6 charecters')
            return;
        }
        setError('')

        createUserWithEmailAndPassword(auth,email,password)
        .then(result =>{
            const user = result.user;
            console.log(user);

            setSuccess(true)

            from.reset();
            // Email verification sent!
            verifyEmail()
            //update user
            updateUserName(name)

        }).catch(error =>{
            setError(error.message)
            console.log(error);
            from.reset();
            

        })
         
        // console.log(name,email,password);

        const verifyEmail= () =>{

        sendEmailVerification(auth.currentUser)
        .then(()=>{
          alert("please check your email and verify your email address")
        })
      } 

      const updateUserName =(name)=>{
        updateProfile(auth.currentUser,{
          displayName:name,
        })
        .then(()=>{
          console.log('update user name');
        })
        .catch(error=>console.log(error))
      }
      
    }

    
    return (
        <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col">
    <div className="text-center lg:text-left">
      <h1 className="text-3xl font-bold my-4">Please Register now!</h1>
    </div>
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form onSubmit={handleRegistation} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="name" name='name' required className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input required type="email" name='email' placeholder="email" className="input input-bordered" />
        </div>
        <div className="form-control">
          <label className="label">
            <span required className="label-text">Password</span>
          </label>
          <input type="password" name='password' placeholder="password" className="input input-bordered" />
          <label className="label">
            <Link to='/login' className="label-text-alt link link-hover">Already Have an Account? please LogIn</Link>
          </label>
        </div>
        <div className="form-control mt-6">
          <button type='submit' className="btn btn-primary">Register</button>
        </div>
        {
            success && <p className='text-green-500'>Registation Successful.</p>
        }
        <p className='text-red-600'>{error}</p>
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;