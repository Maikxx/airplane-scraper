import { migrateAirplaneOrigins } from './migrations/origin'
import { migrateAirplaneRoles } from './migrations/roles'
import { migrateAirplaneManufacturers } from './migrations/manufacturer'

export const runMigrations = async () => {
    await migrateAirplaneOrigins()
    await migrateAirplaneRoles()
    await migrateAirplaneManufacturers()
}
