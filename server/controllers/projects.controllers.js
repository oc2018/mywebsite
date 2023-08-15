import mongoose from "mongoose";
import Project from "../models/project.model.js";

export const getProject = async(req, res) => {
    const { id: _id } = req.params;

    try {
        const project = await Project.findById( _id );
        
        res.status(200).send(project);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: error.message });
    }
}

export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).send(projects);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Server error while fetching the projects.'})
    }
}

export const createProject = async(req, res)=> {
    const data = req.body;

    try {
        const newProject = new Project(data);
        await newProject.save();

        res.status(200).send(newProject);

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Server error while creating the project.'})
    }
}

export const updateProject = async(req, res) => {
    const { id: _id } = req.params;
    const data = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message: `Id is not a valid.`});
    try {
        const isExistingProject = await Project.find({ _id });
        if (!isExistingProject) return res.status(404).send({ message: `This project does not exist` });

        const updatedProject = await Project.findByIdAndUpdate(_id, { ...data }, {new: true });
        
        res.status(200).send(updatedProject);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: 'A server error occurred while updating project. Try again later.' });
    }

}

export const deleteProject = async(req, res) => {
    const { id: _id } = req.params;

    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send({ message: `Not a valid project id.` });

        const isExistingProject = await Project.find({ _id });
        if (!isExistingProject) return res.status(404).send({ message: `Project ${_id} does not exist.`});

        await Project.findByIdAndDelete( _id );
        res.status(200).send({ message: `Project ${ _id } has been deleted successfully.` });

    } catch (error) {
        console.error(error)
        res.status(500).send({ message: `A server error occurred while deleting. Please try again.` });
    }
}