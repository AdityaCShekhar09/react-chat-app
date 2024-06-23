import express from 'express'
import { protectRoute } from '../middleware/protectRoute.js'
import { getUsersSidebar } from '../controllers/controller.user.js'

const router= express.Router()

router.get("/",protectRoute, getUsersSidebar)

export default router