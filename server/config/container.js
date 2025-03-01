const { createContainer, asClass } = require("awilix");

// Importamos los servicios de negocio
const UserService = require("../src/business/services");
const DoctorService = require("../src/business/services");
const PatientService = require("../src/business/services");

// Importamos los repositorios
const UserRepositoryImpl = require("../src/repositories/implementations/UsersImplementation");
const DoctorRepositoryImpl = require("../src/repositories/implementations/UsersDoctorImplementation");
const PatientRepositoryImpl = require("../src/repositories/implementations/UsersPatientsImplementations");


// Creamos el contenedor IoC
const container = createContainer();

container.register({
  // Servicios de negocio
  userService: asClass(UserService).singleton(),
  doctorService: asClass(DoctorService).singleton(),
  patientService: asClass(PatientService).singleton(),

  // Repositorios de persistencia
  userRepository: asClass(UserRepositoryImpl).singleton(),
  doctorRepository: asClass(DoctorRepositoryImpl).singleton(),
  patientRepository: asClass(PatientRepositoryImpl).singleton(),
});

module.exports = container;
