const AppointmentRepository = require('../../src/repositories/implementations/AppointmentImplementation');
const AppointmentModel = require('../../src/infrastructure/models/AppointmentModel');
const Appointment = require('../../src/domain/entities/Appointment');

jest.mock('../../src/infrastructure/models/AppointmentModel');

describe('AppointmentRepository', () => {
  let appointmentRepository;

  beforeEach(() => {
    appointmentRepository = new AppointmentRepository();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all appointments', async () => {
      const mockAppointments = [
        { id: 1, date: '2025-04-01', status_id: 1, patientName: 'John Doe' },
        { id: 2, date: '2025-04-02', status_id: 2, patientName: 'Jane Smith' }
      ];
      
      AppointmentModel.findAll.mockResolvedValue(mockAppointments);
      
      const result = await appointmentRepository.findAll();
      
      expect(AppointmentModel.findAll).toHaveBeenCalled();
      expect(result.length).toBe(2);
      expect(result[0]).toBeInstanceOf(Appointment);
      expect(result[0].id).toBe(1);
      expect(result[1].patientName).toBe('Jane Smith');
    });
  });

  describe('findById', () => {
    it('should return appointment by id', async () => {
      const mockAppointment = { id: 1, date: '2025-04-01', status_id: 1, patientName: 'John Doe' };
      
      AppointmentModel.findByPk.mockResolvedValue(mockAppointment);
      
      const result = await appointmentRepository.findById(1);
      
      expect(AppointmentModel.findByPk).toHaveBeenCalledWith(1);
      expect(result).toBeInstanceOf(Appointment);
      expect(result.id).toBe(1);
      expect(result.patientName).toBe('John Doe');
    });

    it('should return null if appointment not found', async () => {
      AppointmentModel.findByPk.mockResolvedValue(null);
      
      const result = await appointmentRepository.findById(999);
      
      expect(AppointmentModel.findByPk).toHaveBeenCalledWith(999);
      expect(result).toBeNull();
    });
  });