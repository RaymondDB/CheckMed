class AppointmentDTO {
    constructor(id, date, client, service) {
      this.id = id;
      this.date = date;
      this.client = client;
      this.service = service;
    }
  }
  
  module.exports = AppointmentDTO;
  