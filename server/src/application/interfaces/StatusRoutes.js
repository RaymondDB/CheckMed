const express = require('express');
const { OperationResult } = require('../../helpers/OperationResult');

class StatusRoutes {
  constructor(statusService) {
    this.statusService = statusService;
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get('/', this.getAllStatuses.bind(this));
    this.router.get('/:id', this.getStatusById.bind(this));
    this.router.post('/', this.createStatus.bind(this));
    this.router.put('/:id', this.updateStatus.bind(this));
    this.router.delete('/:id', this.deleteStatus.bind(this));
  }

  async getAllStatuses(req, res) {
    try {
      const statuses = await this.statusService.getAllStatuses();
      return res.status(200).json(statuses);
    } catch (error) {
      console.error('Error getting statuses:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getStatusById(req, res) {
    try {
      const id = parseInt(req.params.id);
      const status = await this.statusService.getStatusById(id);
      
      if (!status) {
        return res.status(404).json(OperationResult.notFound('Status not found'));
      }
      
      return res.status(200).json(status);
    } catch (error) {
      console.error('Error getting status:', error);
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  async createStatus(req, res) {
    try {
      const statusData = req.body;
      const newStatus = await this.statusService.createStatus(statusData);
      return res.status(201).json(OperationResult.success(newStatus));
    } catch (error) {
      console.error('Error creating status:', error);
      
      if (error.message === 'Invalid status data') {
        return res.status(400).json(OperationResult.validationError(error.message));
      }
      
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  async updateStatus(req, res) {
    try {
      const id = parseInt(req.params.id);
      const statusData = req.body;
      const updatedStatus = await this.statusService.updateStatus(id, statusData);
      
      if (!updatedStatus) {
        return res.status(404).json(OperationResult.notFound('Status not found'));
      }
      
      return res.status(200).json(OperationResult.success(updatedStatus));
    } catch (error) {
      console.error('Error updating status:', error);
      
      if (error.message === 'Invalid status data') {
        return res.status(400).json(OperationResult.validationError(error.message));
      }
      
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  async deleteStatus(req, res) {
    try {
      const id = parseInt(req.params.id);
      const result = await this.statusService.deleteStatus(id);
      
      if (!result) {
        return res.status(404).json(OperationResult.notFound('Status not found'));
      }
      
      return res.status(200).json(OperationResult.success({ message: 'Status deleted successfully' }));
    } catch (error) {
      console.error('Error deleting status:', error);
      return res.status(500).json(OperationResult.error('Internal server error'));
    }
  }

  getRouter() {
    return this.router;
  }
}

module.exports = StatusRoutes;