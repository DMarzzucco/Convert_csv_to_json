import { Router } from "express";
import { getUser, putUsers, uploadFile } from "../controllers/task.controllers";

const taskRoutes = Router();
// taskRoutes.get("/ruta",ksksks);
taskRoutes.post("/files", uploadFile)
taskRoutes.get("/user", getUser)
taskRoutes.post('/user', putUsers)

export default taskRoutes