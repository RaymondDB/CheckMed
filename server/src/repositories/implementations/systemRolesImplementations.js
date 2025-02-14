const { Role } = require("../infrastructure/db/models");
const RolesRepository = require("../interfaces/RolesRepository");

class RolesRepositoryImpl extends RolesRepository {
  async save(roleData) {
    return await Role.create(roleData);
  }

  async findById(id) {
    return await Role.findByPk(id);
  }

  async findAll() {
    return await Role.findAll();
  }

  async update(id, roleData) {
    const role = await Role.findByPk(id);
    if (!role) return null;

    return await role.update(roleData);
  }

  async delete(id) {
    return await Role.destroy({ where: { RoleID: id } });
  }
}

module.exports = new RolesRepositoryImpl();
