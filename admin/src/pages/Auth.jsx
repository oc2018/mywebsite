import { useState } from 'react';
import { useSignUpMutation, useSignInMutation } from '../services/userApi';
// import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const initialState = { name: '', email: '', password: '', confirmPassword: '' };

    const [formData, setFormData] = useState(initialState);
    const [isSignUp, setIsSignUp] = useState(false);

    const [ signUp ] = useSignUpMutation();
    const [ signIn ] = useSignInMutation();
    // const navigate = useNavigate();

    // console.log(formData)

    // const toggleSignUp = (e) => {
    //     e.preventDefault();
    //     (prevState) => setIsSignUp(!prevState)
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            signUp(formData);
            setIsSignUp(false);
        } else {
            signIn(formData);
        }
        setFormData(initialState);
    };

  return (
    <div className="flex p-5 w-full justify-center items-center h-screen">
        <form className="w-full text-xl md:w-1/3">
            { isSignUp && <input className='w-full rounded-lg bg-slate-50 border-none outline-none p-4 mb-2' type="text" placeholder="Username" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            }
            <input className='w-full rounded-lg bg-slate-50 border-none outline-none p-4 mb-2' type="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
            <input className='w-full rounded-lg bg-slate-50 border-none outline-none p-4 mb-2' type="password" placeholder="Password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            { isSignUp &&
            <input className='w-full rounded-lg bg-slate-50 border-none outline-none p-4 mb-2' type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} />
            }
            <button className='w-full rounded-lg bg-green-300 hover:bg-green-500 border-none outline-none p-3 mb-2' onClick={handleSubmit} >{ isSignUp ? 'Sign Up' : 'Login' }</button>
            <button className='w-full rounded-lg text-blue-300 hover:text-blue-500 border-none outline-none p-3 mb-2' onClick={(prevState) => setIsSignUp(!prevState)}>  { isSignUp ? 'Login' : 'Signup' }</button>
        </form>
    </div>
  )
}

export default Auth