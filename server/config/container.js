const { createContainer, asClass, asValue } = require("awilix");

// Importamos la configuración de la base de datos
const { sequelize } = require("../infrastructure/db/dbconfig");

// Importamos los servicios de negocio (BBL)
const NotificationBService = require("../business/services/notificationsBServices");
const RoleBService = require("../business/services/rolesBServices");
const StatusBService = require("../business/services/statusBServices");

// Importamos los servicios de dominio
const NotificationService = require("../domain/services/systemNotificationService");
const RoleService = require("../domain/services/systemRolesService");
const StatusService = require("../domain/services/systemStatusService");

// Importamos los repositorios (Implementaciones)
const NotificationRepositoryImpl = require("../repositories/implementations/systemNotificationImplementation");
const RoleRepositoryImpl = require("../repositories/implementations/systemRolesImplementation");
const StatusRepositoryImpl = require("../repositories/implementations/systemStatusImplementation");

// Creamos el contenedor IoC
const container = createContainer();

// Registramos las dependencias en el contenedor
container.register({
  sequelize: asValue(sequelize),

  notificationRepository: asClass(NotificationRepositoryImpl).singleton(),
  roleRepository: asClass(RoleRepositoryImpl).singleton(),
  statusRepository: asClass(StatusRepositoryImpl).singleton(),

  notificationBService: asClass(NotificationBService).singleton(),
  roleBService: asClass(RoleBService).singleton(),
  statusBService: asClass(StatusBService).singleton(),

  notificationService: asClass(NotificationService).singleton(),
  roleService: asClass(RoleService).singleton(),
  statusService: asClass(StatusService).singleton(),
});

module.exports = container;
