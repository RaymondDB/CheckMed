const StatusRepository = require('../../src/repositories/implementations/StatusImplementation');
const StatusModel = require('../../src/infrastructure/models/StatusModel');
const Status = require('../../src/domain/entities/Status');

jest.mock('../../src/infrastructure/models/StatusModel');

describe('StatusRepository', () => {
  let statusRepository;

  beforeEach(() => {
    statusRepository = new StatusRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all statuses', async () => {
      const mockStatuses = [
        { id: 1, name: 'pending' },
        { id: 2, name: 'confirmed' },
        { id: 3, name: 'cancelled' }
      ];
      
      StatusModel.findAll.mockResolvedValue(mockStatuses);
      
      const result = await statusRepository.findAll();
      
      expect(StatusModel.findAll).toHaveBeenCalled();
      expect(result.length).toBe(3);
      expect(result[0]).toBeInstanceOf(Status);
      expect(result[0].id).toBe(1);
      expect(result[0].name).toBe('pending');
    });
  });

  describe('findById', () => {
    it('should return status by id', async () => {
      const mockStatus = { id: 1, name: 'pending' };
      
      StatusModel.findByPk.mockResolvedValue(mockStatus);
      
      const result = await statusRepository.findById(1);
      
      expect(StatusModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBeInstanceOf(Status);
      expect(result.id).toBe(1);
      expect(result.name).toBe('pending');
    });

    it('should return null if status not found', async () => {
      StatusModel.findByPk.mockResolvedValue(null);
      
      const result = await statusRepository.findById(999);
      
      expect(StatusModel.findByPk).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });