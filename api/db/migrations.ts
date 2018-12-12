// import { migrateAirplaneOrigins } from './migrations/origin'
// import { migrateAirplaneRoles } from './migrations/roles'
// import { migrateAirplaneManufacturers } from './migrations/manufacturer'
// import { migrateAirplaneUsageStatus } from './migrations/usageStatus'
import { migrateAirplaneAmountBuilt } from './migrations/amountBuilt'

export const runMigrations = async () => {
    // await migrateAirplaneOrigins()
    // await migrateAirplaneRoles()
    // await migrateAirplaneManufacturers()
    // await migrateAirplaneUsageStatus()
    await migrateAirplaneAmountBuilt()
}
