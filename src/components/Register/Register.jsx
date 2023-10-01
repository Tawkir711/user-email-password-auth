import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import auth from '../../firebase/Firebase.init';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Register = () => {
  const [registerError, setRegisterError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = e => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log(name, email, password, accepted);

    // reset error
    setRegisterError('');
    setSuccess('');

    // password condition
    if (password.length < 6) {
      setRegisterError('Password should be at least 6 characters or longer');
      return;  
    }
    else if (! /[a-zA-Z]/.test(password)) {
      setRegisterError('Your password should have at least one uppercase characters.')
      return;
    }
    else if (!accepted) {
      setRegisterError('Please accept our terms and conditions! ')
      return;
    }



    // create user
    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        console.log(result.user);
        setSuccess('User Created Successfully.')


        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg"
        })
          .then(() => {
          console.log('profile updated');
          })
        .catch()

        // send verification email: 
        sendEmailVerification(result.user)
          .then(() => {
          alert('Please check your email and varify your account')
        })

      })
      .catch(error => {
        console.error(error);
        setRegisterError(error.message);
    })

  }

  return (
    <div className="">
      <div className="mx-auto md:w-1/2">
        <h2 className="text-2xl mb-8 font-semibold">Please Register</h2>
        <form onSubmit={handleRegister}>
          <input
            className="mb-4 w-full py-2 px-4 border rounded-xl"
            type="text"
            name="name"
            placeholder="Your name"
            id=""
            required
          />
          <br />
          <input
            className="mb-4 w-full py-2 px-4 border rounded-xl"
            type="email"
            name="email"
            placeholder="Your Email"
            id=""
            required
          />
          <br />
          <div className='relative mb-4'>
            <input
              className=" w-full py-2 px-4 border rounded-xl"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id=""
              required
            />
            <span className='absolute top-3 right-2' onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </span>
          </div>
          <br />
          <div className='mb-2'>
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">Accept our <a>Terms and Conditions</a> </label>
          </div>
          <br />
          <input
            className="btn btn-secondary mb-4 w-full"
            type="submit"
            value="Register"
          />
        </form>
        {registerError && <p className="text-red-600"> {registerError} </p>}
        {success && <p className="text-green-600"> {success} </p>}
        <p>Already have an account? Please<Link to={'/login'}>Login</Link></p>
      </div>
    </div>
  );
};

export default Register;