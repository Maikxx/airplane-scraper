import { migrateAirplaneManufacturers } from './migrations/manufacturer'

export const runMigrations = async () => {
    // await migrateAirplaneOrigins()
    // await migrateAirplaneRoles()
    await migrateAirplaneManufacturers()
}
