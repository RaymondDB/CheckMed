const { Status } = require("../infrastructure/db/models");
const StatusRepository = require("../interfaces/StatusRepository");

class StatusRepositoryImpl extends StatusRepository {
  async save(statusData) {
    return await Status.create(statusData);
  }

  async findById(id) {
    return await Status.findByPk(id);
  }

  async findAll() {
    return await Status.findAll();
  }

  async update(id, statusData) {
    const status = await Status.findByPk(id);
    if (!status) return null;

    return await status.update(statusData);
  }

  async delete(id) {
    return await Status.destroy({ where: { StatusID: id } });
  }
}

module.exports = new StatusRepositoryImpl();
