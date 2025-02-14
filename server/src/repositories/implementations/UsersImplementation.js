const { UserModel } = require("../infrastructure/db/models");
const UsersRepository = require("./interfaces/UsersRepository");

class UsersImplementation extends UsersRepository {
  async save(userData) {
    return await UserModel.create(userData);
  }

  async findById(id) {
    return await UserModel.findByPk(id);
  }

  async findByEmail(email) {
    return await UserModel.findOne({ where: { email } });
  }

  async findAll() {
    return await UserModel.findAll();
  }

  async update(id, userData) {
    const user = await UserModel.findByPk(id);
    if (!user) return null;
    return await user.update(userData);
  }

  async delete(id) {
    return await UserModel.destroy({ where: { id } });
  }
}

module.exports = new UsersImplementation();