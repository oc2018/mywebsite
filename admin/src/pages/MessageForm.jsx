import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useCreateMessageMutation, useGetMessageQuery, useUpdateMessageMutation } from '../services/messages';

const MessageForm = () => {
    const { id } = useParams();
    const initialState = { name: '', email: '' , message: '' };

    const { data } = useGetMessageQuery( id );
    const [ formData, setFormData ] = useState(initialState);
    const [isEdit, setIsEdit] = useState(false);
    const navigate = useNavigate();
    
    const [ createMessage ] = useCreateMessageMutation();
    const [ updateMessage ] = useUpdateMessageMutation();

    const handleClear = () => {
      setFormData(initialState);
        navigate('/');
    }

    const handleClick = (e) => {
        e.preventDefault();
        if(isEdit){
          updateMessage({ id, formData });
        } else {
          createMessage(formData);
        }
        handleClear();
    }

    

    useEffect(()=> {
      if(data){
        setIsEdit(true);
        setFormData(data);
      }
    },[id, data]);

  return (
    <form className='w-full p-5'>
        <input className='w-full p-2 bg-slate-100 border-gray-600 my-2 outline-none' type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder='Enter your Names' />
        <input className='w-full p-2 bg-slate-100 border-gray-600 my-2 outline-none' type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder='Enter your Email' />
        <textarea className='w-full p-2 bg-slate-100 border-gray-600 my-2 outline-none' rows='10' type="text" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder='Enter the Message' />
        <button className='w-full p-2 bg-green-300 hover:bg-green-400 rounded-lg text-lg text-white ' onClick={handleClick}>Save</button>
        <button className='w-full mt-3 p-2 hover:bg-blue-50 text-blue-700 rounded-lg ' onClick={handleClear}>Close</button>
    </form>
  )
}

export default MessageForm