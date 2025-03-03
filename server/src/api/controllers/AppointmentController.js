class AppointmentController {
    async create(req, res) {
      try {
        const appointment = await AppointmentService.create(req.body);
        res.status(201).json(appointment);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  
    async getAll(req, res) {
      try {
        const appointments = await AppointmentService.getAll();
        res.status(200).json(appointments);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
  
  module.exports = new AppointmentController();
  