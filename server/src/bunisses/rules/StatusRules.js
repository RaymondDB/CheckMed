class StatusRules {
  static validateName(name) {
    return typeof name === 'string' && name.trim().length > 0;
  }

  static validateStatusData(statusData) {
    // Required fields
    if (!statusData.name) {
      return false;
    }

    // Validate each field
    return this.validateName(statusData.name);
  }

  static validateUniqueStatusName(name, existingStatuses) {
    // Check if status name already exists
    return !existingStatuses.some(status => 
      status.name.toLowerCase() === name.toLowerCase()
    );
  }
}

module.exports = StatusRules;