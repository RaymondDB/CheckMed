import { GetAllPatients } from "../../domain/usecases/patients/GetAllPatients";
import { GetPatientById } from "../../domain/usecases/patients/GetPatientById";
import { CreatePatient } from "../../domain/usecases/patients/CreatePatient";
import { UpdatePatient } from "../../domain/usecases/patients/UpdatePatient";
import { DeletePatient } from "../../domain/usecases/patients/DeletePatient";
import { Patient } from "../../domain/models/Patient";

export const patientService = {
  async getAll() {
    return await GetAllPatients();
  },

  async getById(id) {
    return await GetPatientById(id);
  },

  async create(data) {
    const patient = new Patient(data);
    return await CreatePatient(patient);
  },

  async update(id, data) {
    const patient = new Patient(data);
    return await UpdatePatient(id, patient);
  },

  async remove(id) {
    return await DeletePatient(id);
  },
};
