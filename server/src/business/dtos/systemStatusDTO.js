class StatusDTO {
  constructor({ StatusID, StatusName }) {
    this.id = StatusID;
    this.name = StatusName;
  }

  static fromModel(statusModel) {
    return new StatusDTO({
      StatusID: statusModel.StatusID,
      StatusName: statusModel.StatusName,
    });
  }
}

module.exports = StatusDTO;
