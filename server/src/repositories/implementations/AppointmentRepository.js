const { sql, poolPromise } = require("../../infrastructure/db/sqlConnection");
const IAppointmentRepository = require("../interfaces/IAppointmentRepository");

class AppointmentRepository extends IAppointmentRepository {
    async createAppointment(appointment) {
        // Implementación futura
    }

    async getAppointmentById(id) {
        // Implementación futura
    }

    async getAllAppointments() {
        // Implementación futura
    }

    async updateAppointment(id, appointment) {
        // Implementación futura
    }

    async deleteAppointment(id) {
        // Implementación futura
    }
}

module.exports = AppointmentRepository;
