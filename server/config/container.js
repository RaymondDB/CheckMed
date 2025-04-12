const { createContainer, asClass, asFunction, asValue } = require('awilix');

const Appointment = require('../src/domain/entities/Appointment');
const Status = require('../src/domain/entities/Status');
const AppointmentDate = require('../src/domain/valueObjects/AppointmentDate');
const StatusName = require('../src/domain/valueObjects/StatusName');
const AppointmentService = require('../src/domain/services/AppointmentService');
const StatusService = require('../src/domain/services/StatusService');
const HttpService = require('../src/domain/services/httpService');
const ValidationService = require('../src/domain/services/validationService');
const EventBus = require('../src/domain/listeners/eventBus');
const AppointmentListener = require('../src/domain/listeners/AppointmentListener');
const StatusListener = require('../src/domain/listeners/StatusListener');


const AppointmentRepository = require('../src/repositories/implementations/AppointmentImplementation');
const StatusRepository = require('../src/repositories/implementations/StatusImplementation');


const AppointmentBService = require('../src/bunisses/services/AppointmentBServices');
const StatusBService = require('../src/bunisses/services/StatusBServices');


const AppointmentsRoutes = require('../src/application/interfaces/AppointmentsRoutes');
const StatusRoutes = require('../src/application/interfaces/StatusRoutes');


const dbConfig = require('../src/infrastructure/db/dbconfig');
const config = require('./config.json');

const container = createContainer();


container.register({
  
  config: asValue(config),
  
 
  appointmentEntity: asClass(Appointment),
  statusEntity: asClass(Status),
  appointmentDateVO: asClass(AppointmentDate),
  statusNameVO: asClass(StatusName),
  
 
  appointmentService: asClass(AppointmentService).singleton(),
  statusService: asClass(StatusService).singleton(),
  httpService: asClass(HttpService).singleton(),
  validationService: asClass(ValidationService).singleton(),
  
  
  eventBus: asClass(EventBus).singleton(),
  appointmentListener: asClass(AppointmentListener).singleton(),
  statusListener: asClass(StatusListener).singleton(),
  

  appointmentRepository: asClass(AppointmentRepository).singleton(),
  statusRepository: asClass(StatusRepository).singleton(),
  
 
  appointmentBService: asClass(AppointmentBService).singleton(),
  statusBService: asClass(StatusBService).singleton(),
  
 
  appointmentsRoutes: asClass(AppointmentsRoutes).singleton(),
  statusRoutes: asClass(StatusRoutes).singleton(),
  

  dbConfig: asFunction(dbConfig).singleton()
});

module.exports = container;