import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: { type: String, required: true },
    screenShot: { type: String, required: true},
    description: { type: String, required: true},
    gitLink: { type: String, required: true},
    projectLink: { type: String, required: true}
},{
    timestamps: true,
});

const projectsModel = mongoose.model('Project', projectSchema);

export default projectsModel;