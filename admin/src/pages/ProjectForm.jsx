import { useState, useEffect } from 'react';
import {  useNavigate, useParams } from "react-router-dom";

import { useCreateProjectMutation, useGetProjectQuery, useUpdateProjectMutation } from '../services/projects';

const ProjectsForm = () => {
  const initialState = { title: '', description: '', screenShot: '', gitLink: '', projectLink: '' };
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [isEdit, setIsEdit] = useState(false)
  const navigate = useNavigate();

  const [ createProject ] = useCreateProjectMutation();
  const [ updateProject ] = useUpdateProjectMutation();
  const  { data }  = useGetProjectQuery(id);

  const handleClear = () => {
    setFormData(initialState);
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (isEdit) {
      updateProject({ id, formData });
    } else {
      createProject( formData);      
    }

    handleClear();
  }
 
  useEffect(()=> { 
    if(data){
      setIsEdit(true);
      setFormData(data);    
    }
  },[data, id])

  return (
    <div className=' w-full p-10'>
      <p className='text-bold text-3xl text-indigo-950 mb-5 text-center'>Enter the Project Details</p>
      <form action="">
        <input className='w-full bg-slate-50 mb-2 p-2 outline-none rounded-sm' type="text" value={ formData.title } placeholder='Title' onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
        <input className='w-full bg-slate-50 mb-2 p-2 outline-none rounded-sm' type="text" value={ formData.description } placeholder='Enter a description.' onChange={(e)=> setFormData({ ...formData, description: e.target.value })} />
        <input className='w-full bg-slate-50 mb-2 p-2 outline-none rounded-sm' type="text" value={ formData.screenShot } placeholder='Screenshot URL' onChange={(e)=> setFormData({ ...formData, screenShot: e.target.value })} />
        <input className='w-full bg-slate-50 mb-2 p-2 outline-none rounded-sm' type="text" value={ formData.gitLink } placeholder='GitHub Link' onChange={(e)=> setFormData({ ...formData, gitLink: e.target.value })} />
        <input className='w-full bg-slate-50 mb-2 p-2 outline-none rounded-sm' type="text" value={ formData.projectLink } placeholder='Project Link' onChange={(e)=> setFormData({ ...formData, projectLink: e.target.value })} />
        <button className='w-full font-bold mb-2 p-2 bg-green-300 hover:bg-green-500 text-white rounded-sm' onClick={handleSubmit}>Save</button>
        <button className='w-full font-bold mb-2 p-2 text-blue-500 hover:bg-blue-50 rounded-sm' onClick={handleClear}>Exit</button>
      </form> 
    </div> 
  )
}

export default ProjectsForm;