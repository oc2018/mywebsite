import { useState } from 'react';
import { useSignUpMutation, useSignInMutation } from '../services/userApi';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const initialState = { name: '', email: '', password: '', confirmPassword: '' };

    const [formData, setFormData] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);

    const [ signUp ] = useSignUpMutation();
    const [ signIn ] = useSignInMutation();
    const navigate = useNavigate();

    // console.log(formData)

    const toggleSignUp = (e) => {
        e.preventDefault();
        setIsSignUp(prevState => !prevState)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            signUp(formData);
            setIsSignUp(false);
        } else {
            signIn(formData);
            navigate('/dashboard');
        }
        setFormData(initialState);
    };

  return (
    <div className="flex p-10 md:p-5 w-full justify-center items-center h-screen">
        <form className="w-full text-md md:text-lg md:w-1/3">
            { isSignUp && <input className='w-full rounded-md bg-slate-50 border-none outline-none p-3 mb-3' type="text" placeholder="Username" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            }
            <input className='w-full rounded-md bg-slate-50 border-none outline-none p-3 mb-3' type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input className='w-full rounded-md bg-slate-50 border-none outline-none p-3 mb-3' type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            { isSignUp &&
            <input className='w-full rounded-md bg-slate-50 border-none outline-none p-3 mb-2' type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            }
            <button className='w-full rounded-md bg-green-300 hover:bg-green-500 border-none outline-none p-3 mb-3' onClick={handleSubmit} >{ isSignUp ? 'Sign Up' : 'Login' }</button>
            <button className='w-full rounded-md text-blue-500 hover:bg-blue-50 border-none outline-none p-3' onClick={toggleSignUp}>  { isSignUp ? 'Login' : 'Signup' }</button>
        </form>
    </div>
  )
}

export default Auth