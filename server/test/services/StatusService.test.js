const StatusService = require('../../src/domain/services/StatusService');
const StatusRepository = require('../../src/repositories/interfaces/StatusRepository');
const ValidationService = require('../../src/domain/services/validationService');
const EventBus = require('../../src/domain/listeners/eventBus');
const Status = require('../../src/domain/entities/Status');
const StatusDTO = require('../../src/bunisses/dtos/StatusDTO');

jest.mock('../../src/repositories/interfaces/StatusRepository');
jest.mock('../../src/domain/services/validationService');
jest.mock('../../src/domain/listeners/eventBus');

describe('StatusService', () => {
  let statusService;
  let mockStatusRepository;
  let mockValidationService;
  let mockEventBus;

  beforeEach(() => {
    mockStatusRepository = new StatusRepository();
    mockValidationService = new ValidationService();
    mockEventBus = new EventBus();
    statusService = new StatusService(
      mockStatusRepository, 
      mockValidationService,
      mockEventBus
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllStatuses', () => {
    it('should return all statuses', async () => {
      const mockStatuses = [
        new Status(1, 'pending'),
        new Status(2, 'confirmed'),
        new Status(3, 'cancelled')
      ];
      
      mockStatusRepository.findAll.mockResolvedValue(mockStatuses);
      
      const result = await statusService.getAllStatuses();
      
      expect(mockStatusRepository.findAll).toHaveBeenCalled();
      expect(result.length).toBe(3);
      expect(result[0]).toBeInstanceOf(StatusDTO);
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe('pending');
    });
  });

  describe('createStatus', () => {
    it('should create a new status', async () => {
      const statusData = {
        name: 'rescheduled'
      };
      
      const newStatus = new Status(4, 'rescheduled');
      
      mockValidationService.validateStatus.mockReturnValue(true);
      mockStatusRepository.create.mockResolvedValue(newStatus);
      
      const result = await statusService.createStatus(statusData);
      
      expect(mockValidationService.validateStatus).toHaveBeenCalledWith(statusData);
      expect(mockStatusRepository.create).toHaveBeenCalledWith(expect.any(Status));
      expect(mockEventBus.emit).toHaveBeenCalledWith('status.created', expect.any(StatusDTO));
      expect(result).toBeInstanceOf(StatusDTO);
      expect(result.id).toBe(4);
      expect(result.name).toBe('rescheduled');
    });

    it('should throw error if validation fails', async () => {
      const statusData = {
        name: ''  // invalid empty name
      };
      
      mockValidationService.validateStatus.mockReturnValue(false);
      
      await expect(statusService.createStatus(statusData))
        .rejects.toThrow('Invalid status data');
      
      expect(mockValidationService.validateStatus).toHaveBeenCalledWith(statusData);
      expect(mockStatusRepository.create).not.toHaveBeenCalled();
      expect(mockEventBus.emit).not.toHaveBeenCalled();
    });
  });