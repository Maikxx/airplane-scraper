import * as express from 'express'
import * as AirplaneController from '../controllers/airplane'
import * as FilterController from '../controllers/filters'

const router = express.Router()

router.get('/manufacturers', FilterController.getManufacturers)
router.get('/origins', FilterController.getOrigins)
router.get('/roles', FilterController.getRoles)
router.get('/', AirplaneController.get)

export default router
