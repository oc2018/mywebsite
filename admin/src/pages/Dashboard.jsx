// import React from 'react';
import { Link } from 'react-router-dom';

import { useGetMessagesQuery, useDeleteMessageMutation } from '../services/messagesApi';
import { useGetProjectsQuery, useDeleteProjectMutation } from '../services/projectsApi';
import { useGetUsersQuery } from '../services/userApi';
import { Loading } from '../components';
import { dateFormatter } from '../util/dateFormatter';

const Dashboard = () => {
    const { data: messages, isLoading: messagesIsLoading } = useGetMessagesQuery();
    const { data: users } = useGetUsersQuery();
    const [ deleteMessage ]  = useDeleteMessageMutation();
    const [ deleteProject ] = useDeleteProjectMutation();
    const { data: projects, isLoading: projectIsLoading } = useGetProjectsQuery();

    console.log(users)

    const deleteMsg = ( id ) => {
      // e.preventDefault();
      deleteMessage(id);
    } 

    const deletePjt = ( id ) => {
      deleteProject(id);
    }

  return (
    <div className="flex w-full flex-col md:flex-row">
      <div className='p-4 w-full flex gap-2 flex-col'>
        <h3 className='text-center mb-10 text-3xl font-bold text-purple-950'>Messages</h3>
        <Link className="w-auto text-sm px-3 mb-2 py-1 rounded-sm text-blue-500 font-semibold bg-gray-300 float-right" to={`/msgForm`}>Enter the Message</Link>
         {
          messagesIsLoading ? <Loading /> : messages.map( message => (
              <div className='w-full p-5 mb-2 bg-slate-50 rounded-lg' key={ message._id }>
                  <div className='flex justify-between items-center w-full'>
                    <p className='flex justify-center items-center w-10 h-10 font-bold bg-purple-900 rounded-full text-white'>{message.name.charAt(0)}</p>
                    <div className='mr-3'>
                      <p className=''>{ message.name }</p>
                      <p className='text-xs text-gray-400'>{ message.email }</p>
                      <p className='text-xs text-gray-400'>{dateFormatter( message.createdAt )}</p>
                    </div>
                  </div>
                  <p className='py-3'>{ message.message }</p>
                  <div className='flex justify-between w-full'>
                  <Link className='text-sm px-3 py-1 rounded-sm text-blue-500 font-semibold bg-gray-300 hover:bg-blue-50' to={`/msgForm/${ message._id }`}>Edit Message</Link>
                  <Link className='text-sm px-3 py-1 rounded-sm text-red-500 font-semibold hover:bg-red-50' onClick={() => deleteMsg( message._id ) }>Delete Message</Link>
                  </div>
              </div>
          ))
         }
      </div>
      <div className="w-full p-4">
         <h3 className='text-center mb-10 text-3xl font-bold text-purple-950'>Projects</h3>
         <Link to={'/projectForm'} className="w-auto text-sm px-3 mb-2 py-1 rounded-sm text-blue-500 font-semibold bg-gray-300 float-right" >Enter Project</Link>
         <div className="w-full flex flex-col gap-3">{
           projectIsLoading ? <Loading /> : projects.map( project => (
            <div key={ project._id } className="w-full mb-2 rounded-lg bg-slate-50 p-5">
              <p className='text-center text-xl mb-5 font-semibold'>{ project.title }</p>
              <div className="flex justify-between">
                <p className='text-xs text-gray-500 mb-2'>Created On: { dateFormatter(project.createdAt)}</p>
                <p className='text-xs text-gray-500 mb-2'>Last Edited on: { dateFormatter( project.updatedAt )}</p>
              </div>
              <img src={`${ project.screenShot }`} alt="screenshot" />
              <p className='mt-3'>{ project.description }</p>
              <div className="mt-3">
                <p className='text-[500] '>GitHub Link: <Link to={project.gitLink}><span className='text-sm text-indigo-600 italic cursor-pointer'>{ project.gitLink }</span></Link></p>
                <p className='text-[500] '>Project Url: <Link to={project.projectLink}><span className='text-sm text-indigo-600 italic cursor-pointer'>{ project.projectLink }</span></Link></p>
              </div>
              <div className='flex justify-between mt-3 w-full'>
                <Link className='text-sm px-3 py-1 rounded-sm text-blue-500 font-semibold bg-gray-300 hover:bg-blue-50' to={`/projectForm/${ project._id }`}>Edit Project</Link>
                <Link className='text-sm px-3 py-1 rounded-sm text-red-500 font-semibold hover:bg-red-50 ' onClick={() => deletePjt( project._id ) }>Delete Project</Link>
              </div>
            </div>
           )) 
         }
         </div>
      </div>
    </div>
  )
}

export default Dashboard