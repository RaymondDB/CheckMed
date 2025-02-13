const { sql, poolPromise } = require("../../infrastructure/db/sqlConnection");
const IStatusRepository = require("../interfaces/IStatusRepository");

class StatusRepository extends IStatusRepository {
    async createStatus(status) {
        // Implementación futura
    }

    async getStatusById(id) {
        // Implementación futura
    }

    async getAllStatuses() {
        // Implementación futura
    }

    async updateStatus(id, status) {
        // Implementación futura
    }

    async deleteStatus(id) {
        // Implementación futura
    }
}

module.exports = StatusRepository;
