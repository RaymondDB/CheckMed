const AppointmentApp = require('../../src/application/interfaces/AppointmentsRoutes');
const AppointmentService = require('../../src/domain/services/AppointmentService');
const AppointmentRepository = require('../../src/repositories/interfaces/AppointmentRepository');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('../../src/domain/services/AppointmentService');

describe('AppointmentApp', () => {
  let appointmentApp;
  let mockAppointmentService;
  let req;
  let res;

  beforeEach(() => {
    mockAppointmentService = new AppointmentService();
    appointmentApp = new AppointmentApp(mockAppointmentService);
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAppointments', () => {
    it('should return all appointments', async () => {
      const mockAppointments = [
        { id: 1, date: '2025-04-01', status: 'pending' },
        { id: 2, date: '2025-04-02', status: 'confirmed' }
      ];
      
      mockAppointmentService.getAllAppointments.mockResolvedValue(mockAppointments);
      
      await appointmentApp.getAllAppointments(req, res);
      
      expect(mockAppointmentService.getAllAppointments).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockAppointments);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors', async () => {
      mockAppointmentService.getAllAppointments.mockRejectedValue(new Error('Database error'));
      
      await appointmentApp.getAllAppointments(req, res);
      
      expect(mockAppointmentService.getAllAppointments).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
