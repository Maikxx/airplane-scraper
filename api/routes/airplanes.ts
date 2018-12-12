import * as express from 'express'
import * as RequestController from '../controllers/requests'

const router = express.Router()

router.get('/usageStatuses', RequestController.getUsageStatuses)
router.get('/manufacturers', RequestController.getManufacturers)
router.get('/origins', RequestController.getOrigins)
router.get('/roles', RequestController.getRoles)
router.get('/', RequestController.getAirplanes)

export default router
