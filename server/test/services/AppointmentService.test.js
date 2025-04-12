const AppointmentService = require('../../src/domain/services/AppointmentService');
const AppointmentRepository = require('../../src/repositories/interfaces/AppointmentRepository');
const ValidationService = require('../../src/domain/services/validationService');
const EventBus = require('../../src/domain/listeners/eventBus');
const Appointment = require('../../src/domain/entities/Appointment');
const AppointmentDTO = require('../../src/bunisses/dtos/AppointmentDTO');

jest.mock('../../src/repositories/interfaces/AppointmentRepository');
jest.mock('../../src/domain/services/validationService');
jest.mock('../../src/domain/listeners/eventBus');

describe('AppointmentService', () => {
  let appointmentService;
  let mockAppointmentRepository;
  let mockValidationService;
  let mockEventBus;

  beforeEach(() => {
    mockAppointmentRepository = new AppointmentRepository();
    mockValidationService = new ValidationService();
    mockEventBus = new EventBus();
    appointmentService = new AppointmentService(
      mockAppointmentRepository, 
      mockValidationService,
      mockEventBus
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllAppointments', () => {
    it('should return all appointments', async () => {
      const mockAppointments = [
        new Appointment(1, '2025-04-01', 1, 'John Doe'),
        new Appointment(2, '2025-04-02', 2, 'Jane Smith')
      ];
      
      mockAppointmentRepository.findAll.mockResolvedValue(mockAppointments);
      
      const result = await appointmentService.getAllAppointments();
      
      expect(mockAppointmentRepository.findAll).toHaveBeenCalled();
      expect(result.length).toBe(2);
      expect(result[0]).toBeInstanceOf(AppointmentDTO);
      expect(result[0].id).toBe(1);
      expect(result[1].patientName).toBe('Jane Smith');
    });
  });

  describe('createAppointment', () => {
    it('should create a new appointment', async () => {
      const appointmentData = {
        date: '2025-04-03',
        statusId: 1,
        patientName: 'New Patient'
      };
      
      const newAppointment = new Appointment(3, '2025-04-03', 1, 'New Patient');
      
      mockValidationService.validateAppointment.mockReturnValue(true);
      mockAppointmentRepository.create.mockResolvedValue(newAppointment);
      
      const result = await appointmentService.createAppointment(appointmentData);
      
      expect(mockValidationService.validateAppointment).toHaveBeenCalledWith(appointmentData);
      expect(mockAppointmentRepository.create).toHaveBeenCalledWith(expect.any(Appointment));
      expect(mockEventBus.emit).toHaveBeenCalledWith('appointment.created', expect.any(AppointmentDTO));
      expect(result).toBeInstanceOf(AppointmentDTO);
      expect(result.id).toBe(3);
      expect(result.patientName).toBe('New Patient');
    });

    it('should throw error if validation fails', async () => {
      const appointmentData = {
        date: 'invalid-date',
        statusId: 1,
        patientName: 'New Patient'
      };
      
      mockValidationService.validateAppointment.mockReturnValue(false);
      
      await expect(appointmentService.createAppointment(appointmentData))
        .rejects.toThrow('Invalid appointment data');
      
      expect(mockValidationService.validateAppointment).toHaveBeenCalledWith(appointmentData);
      expect(mockAppointmentRepository.create).not.toHaveBeenCalled();
      expect(mockEventBus.emit).not.toHaveBeenCalled();
    });
  });