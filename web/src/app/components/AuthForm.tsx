import { Link, useNavigate } from 'react-router-dom';
import '../../assets/styles/AuthForm.css';
import { useLoginMutation, useRegisterMutation } from '../store/api/endpoints/authApi';
import React, { useState } from 'react';
import { useToastContext } from '../hooks/contexts/ToastContext';
import getErrorMsg from '../utils/getErrorMsg';
import { useCookies } from 'react-cookie';

interface AuthFormProps {
  isLogin: boolean;
}

function AuthForm ({ isLogin }: AuthFormProps) {

  const [register] = useRegisterMutation();
  const [login] = useLoginMutation();

  const { showMessage } = useToastContext();
  const [, setAccessCookie] = useCookies(['accessToken']);

  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string | null>(null);
  const [lastName, setLastName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isLogin) {
      await login({
        email: email as any,
        password: password  as any,
      })
        .unwrap()
        .then(({ accessToken }) => {
          setAccessCookie('accessToken', accessToken, { maxAge: 86400 });
          navigate('/');
        })
        .catch((error) => {
          showMessage(getErrorMsg(error));
        });
    } else {
      await register({
        firstName: firstName as any,
        lastName: lastName as any,
        email: email as any,
        password: password as any,
      })
        .unwrap()
        .then(() => {
          navigate('/verifyEmail');
        })
        .catch((error) => {
          showMessage(getErrorMsg(error));
        });
    }
  }

  return (
    <div className="form-block">
      <form className='auth-form' onSubmit={handleSubmit}>
        <h2>{ isLogin ? 'Log in' : 'Sign up'}</h2>
        {
          isLogin ?
            null
          :
          <>
            <div className='input-block'>
              <label htmlFor='firstName'>First name</label>
              <input type='text' name='firstName' onChange={(e) => {setFirstName(e.target.value)}}/>
            </div>
            <div className='input-block'>
              <label htmlFor='lastName'>Last name</label>
              <input type='text' name='lastName' onChange={(e) => {setLastName(e.target.value)}}/>
            </div>
          </>
        }
        <div className='input-block'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' onChange={(e) => {setEmail(e.target.value)}}/>
        </div>
        <div className='input-block'>
          <label htmlFor='password'>Password</label>
          <input type='text' name='password' onChange={(e) => {setPassword(e.target.value)}}/>
        </div>
        <button type='submit' className='form-button_submit'>{ isLogin ? 'Log in' : 'Create account' }</button>
        {
          isLogin ?
            <p>Not registered yet? <Link to='/signup'>Sign up</Link></p>
          :
            <p>Already have an account? <Link to='/login'>Log in</Link></p>
        }
      </form>
    </div>
  );
}

export default AuthForm;