const express = require('express');
const { OperationResult } = require('../../helpers/OperationResult');

class AppointmentsRoutes {
  constructor(appointmentService) {
    this.appointmentService = appointmentService;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllAppointments.bind(this));
    this.router.get('/:id', this.getAppointmentById.bind(this));
    this.router.post('/', this.createAppointment.bind(this));
    this.router.put('/:id', this.updateAppointment.bind(this));
    this.router.delete('/:id', this.deleteAppointment.bind(this));
  }

  async getAllAppointments(req, res) {
    try {
      const appointments = await this.appointmentService.getAllAppointments();
      return res.status(200).json(appointments);
    } catch (error) {
      console.error('Error getting appointments:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getAppointmentById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const appointment = await this.appointmentService.getAppointmentById(id);
      
      if (!appointment) {
        return res.status(404).json(OperationResult.notFound('Appointment not found'));
      }
      
      return res.status(200).json(appointment);
    } catch (error) {
      console.error('Error getting appointment:', error);
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  async createAppointment(req, res) {
    try {
      const appointmentData = req.body;
      const newAppointment = await this.appointmentService.createAppointment(appointmentData);
      return res.status(201).json(OperationResult.success(newAppointment));
    } catch (error) {
      console.error('Error creating appointment:', error);
      
      if (error.message === 'Invalid appointment data') {
        return res.status(400).json(OperationResult.validationError(error.message));
      }
      
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  async updateAppointment(req, res) {
    try {
      const id = parseInt(req.params.id);
      const appointmentData = req.body;
      const updatedAppointment = await this.appointmentService.updateAppointment(id, appointmentData);
      
      if (!updatedAppointment) {
        return res.status(404).json(OperationResult.notFound('Appointment not found'));
      }
      
      return res.status(200).json(OperationResult.success(updatedAppointment));
    } catch (error) {
      console.error('Error updating appointment:', error);
      
      if (error.message === 'Invalid appointment data') {
        return res.status(400).json(OperationResult.validationError(error.message));
      }
      
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  async deleteAppointment(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.appointmentService.deleteAppointment(id);
      
      if (!result) {
        return res.status(404).json(OperationResult.notFound('Appointment not found'));
      }
      
      return res.status(200).json(OperationResult.success({ message: 'Appointment deleted successfully' }));
    } catch (error) {
      console.error('Error deleting appointment:', error);
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = AppointmentsRoutes;