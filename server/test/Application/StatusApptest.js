const StatusApp = require('../../src/application/interfaces/StatusRoutes');
const StatusService = require('../../src/domain/services/StatusService');
const { mockRequest, mockResponse } = require('jest-mock-req-res');

jest.mock('../../src/domain/services/StatusService');

describe('StatusApp', () => {
  let statusApp;
  let mockStatusService;
  let req;
  let res;

  beforeEach(() => {
    mockStatusService = new StatusService();
    statusApp = new StatusApp(mockStatusService);
    req = mockRequest();
    res = mockResponse();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllStatuses', () => {
    it('should return all statuses', async () => {
      const mockStatuses = [
        { id: 1, name: 'pending' },
        { id: 2, name: 'confirmed' },
        { id: 3, name: 'cancelled' }
      ];
      
      mockStatusService.getAllStatuses.mockResolvedValue(mockStatuses);
      
      await statusApp.getAllStatuses(req, res);
      
      expect(mockStatusService.getAllStatuses).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(mockStatuses);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    it('should handle errors', async () => {
      mockStatusService.getAllStatuses.mockRejectedValue(new Error('Database error'));
      
      await statusApp.getAllStatuses(req, res);
      
      expect(mockStatusService.getAllStatuses).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });