const Status = require('../entities/Status');
const StatusDTO = require('../../bunisses/dtos/StatusDTO');
const StatusEvents = require('../events/StatusEvents');

class StatusService {
  constructor(statusRepository, validationService, eventBus) {
    this.statusRepository = statusRepository;
    this.validationService = validationService;
    this.eventBus = eventBus;
  }

  async getAllStatuses() {
    const statuses = await this.statusRepository.findAll();
    return StatusDTO.fromEntities(statuses);
  }

  async getStatusById(id) {
    const status = await this.statusRepository.findById(id);
    if (!status) {
      return null;
    }
    return StatusDTO.fromEntity(status);
  }

  async createStatus(statusData) {
    // Validate status data
    if (!this.validationService.validateStatus(statusData)) {
      throw new Error('Invalid status data');
    }

    // Create status entity
    const status = new Status(
      null,
      statusData.name
    );

    // Save to repository
    const savedStatus = await this.statusRepository.create(status);
    
    // Convert to DTO
    const statusDTO = StatusDTO.fromEntity(savedStatus);
    
    // Emit event
    this.eventBus.emit('status.created', statusDTO);
    
    return statusDTO;
  }

  async updateStatus(id, statusData) {
    // Validate status data
    if (!this.validationService.validateStatus(statusData, true)) {
      throw new Error('Invalid status data');
    }

    // Get existing status
    const existingStatus = await this.statusRepository.findById(id);
    if (!existingStatus) {
      return null;
    }

    // Update status
    existingStatus.update(statusData);
    
    // Save to repository
    const updatedStatus = await this.statusRepository.update(existingStatus);
    
    // Convert to DTO
    const statusDTO = StatusDTO.fromEntity(updatedStatus);
    
    // Emit event
    this.eventBus.emit('status.updated', statusDTO);
    
    return statusDTO;
  }

  async deleteStatus(id) {
    const status = await this.statusRepository.findById(id);
    if (!status) {
      return false;
    }

    await this.statusRepository.delete(id);
    
    // Emit event
    this.eventBus.emit('status.deleted', { id });
    
    return true;
  }
}

module.exports = StatusService;