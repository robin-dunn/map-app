import * as express from "express"
import { Request, Response } from "express"
import IControllerBase from "../interfaces/IControllerBase.interface"
import { Project } from "../dal/models/project";
import * as moment from "moment";

class ProjectController implements IControllerBase {
    public routeBase = "/api/project";
    public router = express.Router({ strict: false });

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get("/", this.getProjects);
        this.router.post("/", this.postCreateProject);
    }

    getProjects = async (req: Request, res: Response) => {
        let projects = await Project.findAll();
        res.json(projects);
    }

    postCreateProject = async (req: Request, res: Response) => {
        let newProjectName:string = moment().format("YYYYMMDD_h_mm_ss");
        let newProject: Project = await Project.create({ name: newProjectName });
        res.json(newProject);
    }
};

export default ProjectController