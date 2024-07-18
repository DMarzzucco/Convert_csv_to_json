import { Router } from "express";
import { getAllUser, getUser, putUsers, uploadFile } from "../controllers/task.controllers";

const taskRoutes = Router();
// taskRoutes.get("/ruta",ksksks);
taskRoutes.post("/files", uploadFile)
taskRoutes.get("/user", getUser)
taskRoutes.post('/user', putUsers)
taskRoutes.get('/all', getAllUser)

export default taskRoutes