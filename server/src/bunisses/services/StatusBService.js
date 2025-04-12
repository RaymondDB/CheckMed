const StatusDTO = require('../dtos/StatusDTO');
const StatusRules = require('../rules/StatusRules');

class StatusBServices {
  constructor(statusRepository) {
    this.statusRepository = statusRepository;
  }

  async validateStatusData(statusData, isUpdate = false, statusId = null) {
    // Validate basic status data
    if (!StatusRules.validateStatusData(statusData)) {
      return {
        isValid: false,
        message: 'Invalid status data'
      };
    }

    // Check if status name is unique
    const existingStatuses = await this.statusRepository.findAll();
    
    // Filter out the current status if updating
    const otherStatuses = isUpdate ? 
      existingStatuses.filter(status => status.id !== statusId) : 
      existingStatuses;
      
    if (!StatusRules.validateUniqueStatusName(statusData.name, otherStatuses)) {
      return {
        isValid: false,
        message: 'Status name already exists'
      };
    }

    // For updates, check if status exists
    if (isUpdate && statusId) {
      const existingStatus = await this.statusRepository.findById(statusId);
      if (!existingStatus) {
        return {
          isValid: false,
          message: 'Status not found'
        };
      }
    }

    return {
      isValid: true
    };
  }

  async transformStatusesToDTO(statuses) {
    return StatusDTO.fromEntities(statuses);
  }

  async transformStatusToDTO(status) {
    return StatusDTO.fromEntity(status);
  }
}

module.exports = StatusBServices;