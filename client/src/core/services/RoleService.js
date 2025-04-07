export class RoleService {
  constructor(roleRepository) {
    this.roleRepository = roleRepository;
  }

  async create(role) {
    return await this.roleRepository.create(role);
  }

  async getById(id) {
    return await this.roleRepository.getById(id);
  }

  async update(id, role) {
    return await this.roleRepository.update(id, role);
  }

  async delete(id) {
    return await this.roleRepository.delete(id);
  }
}
