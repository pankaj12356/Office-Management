import { createTask,deleteTask,updateStatus,getTask } from "../controllers/task.controller.js";
import express from 'express'
import {requireAuth,requireAdmin} from '../middleware/auth.middleware.js'


const router = express.Router();

router.post('/',requireAuth,requireAdmin,createTask)
router.get("/",requireAuth,getTask)
router.get("/:id",requireAuth,getTask)
router.patch('/:id/',requireAuth,updateStatus)
router.delete('/:id/',requireAuth,requireAdmin,deleteTask)

export default router;
