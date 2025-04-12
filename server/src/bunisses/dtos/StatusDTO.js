class StatusDTO {
  constructor(status) {
    this.id = status.id;
    this.name = status.name;
    this.createdAt = status.createdAt;
    this.updatedAt = status.updatedAt;
  }

  static fromEntity(status) {
    return new StatusDTO(status);
  }

  static fromEntities(statuses) {
    return statuses.map(status => StatusDTO.fromEntity(status));
  }
}

module.exports = StatusDTO;