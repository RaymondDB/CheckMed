const { Patient } = require("../infrastructure/db/models");
const PatientRepository = require("../interfaces/UsersPatientsRepository");


class PatientRepositoryImpl extends PatientRepository{
  async save(patientData) {
    return await Patient.create(patientData);
  }

  async findById(id) {
    return await Patient.findByPk(id);
  }

  async findAll() {
    return await Patient.findAll();
  }

  async update(id, patientData) {
    const patient = await Patient.findByPk(id);
    if (!patient) return null;

    return await patient.update(patientData);
  }

  async delete(id) {
    return await Patient.destroy({ where: { id } });
  }
}

module.exports = new PatientRepositoryImpl();
