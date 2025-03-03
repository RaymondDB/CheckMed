class StatusController {
    async update(req, res) {
      try {
        const status = await StatusService.update(req.params.id, req.body);
        res.status(200).json(status);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getStatusByAppointment(req, res) {
      try {
        const status = await StatusService.getByAppointmentId(req.params.appointmentId);
        res.status(200).json(status);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = new StatusController();
  