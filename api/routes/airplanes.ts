import * as express from 'express'
import * as AirplaneController from '../controllers/airplane'

const router = express.Router()

router.get('/', AirplaneController.get)

export default router
