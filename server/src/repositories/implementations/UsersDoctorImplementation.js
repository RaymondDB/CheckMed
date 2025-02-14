const { Doctor } = require("../infrastructure/db/models");
const DoctorsRepository = require("../interfaces/UsersDoctorsRepository")

class DoctorRepositoryImpl extends DoctorsRepository {
  async save(doctorData) {
    return await Doctor.create(doctorData);
  }

  async findById(id) {
    return await Doctor.findByPk(id);
  }

  async findAll() {
    return await Doctor.findAll();
  }

  async update(id, doctorData) {
    const doctor = await Doctor.findByPk(id);
    if (!doctor) return null;

    return await doctor.update(doctorData);
  }

  async delete(id) {
    return await Doctor.destroy({ where: { id } });
  }
}

module.exports = new DoctorRepositoryImpl();
