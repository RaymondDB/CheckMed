const StatusRepository = require('../interfaces/StatusRepository');
const { StatusModel } = require('../../infrastructure/models');

class StatusImplementation extends StatusRepository {
  async save(status) {
    try {
      const newStatus = await StatusModel.create(status);
      return newStatus;
    } catch (error) {
      throw new Error('Error saving status: ' + error.message);
    }
  }

  async findById(id) {
    try {
      const status = await StatusModel.findByPk(id);
      if (!status) throw new Error('Status not found');
      return status;
    } catch (error) {
      throw new Error('Error finding status: ' + error.message);
    }
  }

  async findAll() {
    try {
      const statuses = await StatusModel.findAll();
      return statuses;
    } catch (error) {
      throw new Error('Error fetching statuses: ' + error.message);
    }
  }

  async update(id, statusData) {
    try {
      const status = await StatusModel.findByPk(id);
      if (!status) throw new Error('Status not found');

      await status.update(statusData);
      return status;
    } catch (error) {
      throw new Error('Error updating status: ' + error.message);
    }
  }

  async delete(id) {
    try {
      const status = await StatusModel.findByPk(id);
      if (!status) throw new Error('Status not found');

      await status.destroy();
      return { message: 'Status deleted successfully' };
    } catch (error) {
      throw new Error('Error deleting status: ' + error.message);
    }
  }
}

module.exports = StatusImplementation;
