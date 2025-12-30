import express from 'express'
import { 
    register,
    login,
    logout,
    updateProfile,
    profile,
    refresh,
    getUser
} from '../controllers/auth.controllers.js'
import { requireAdmin, requireAuth } from '../middleware/auth.middleware.js'
import upload from '../middleware/multer.js'
const router = express.Router()

router.post('/register',upload.single('profileImage'),register)
router.post('/login',login)
router.post('/refresh',refresh)
router.get('/',requireAuth,profile)
router.get('/users',requireAuth,requireAdmin,getUser)
router.put('/update',requireAuth,updateProfile)
router.delete('/',logout)

export default router;