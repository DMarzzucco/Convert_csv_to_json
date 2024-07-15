import { Router } from "express";
import { getUser, uploadFile } from "../controllers/task.controllers";

const taskRoutes = Router();
// taskRoutes.get("/ruta",ksksks);
taskRoutes.post("/files", uploadFile)
taskRoutes.get("/user", getUser)

export default taskRoutes