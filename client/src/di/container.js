// Repositorios concretos
import { NotificationRepository } from "../infrastructure/repositories/NotificationRepository";
import { RoleRepository } from "../infrastructure/repositories/RoleRepository";
import { StatusRepository } from "../infrastructure/repositories/StatusRepository";

// Servicios
import { NotificationService } from "../core/services/NotificationService";
import { RoleService } from "../core/services/RoleService";
import { StatusService } from "../core/services/StatusService";

// Instancias de repositorios
const notificationRepository = new NotificationRepository();
const roleRepository = new RoleRepository();
const statusRepository = new StatusRepository();

// Inyección de repositorios en servicios
const notificationService = new NotificationService(notificationRepository);
const roleService = new RoleService(roleRepository);
const statusService = new StatusService(statusRepository);

// Contenedor exportado
export const container = {
  notificationService,
  roleService,
  statusService,
};
