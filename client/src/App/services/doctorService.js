import { GetAllDoctors } from "../../domain/usecases/doctors/GetAllDoctors";
import { GetDoctorById } from "../../domain/usecases/doctors/GetDoctorById";
import { CreateDoctor } from "../../domain/usecases/doctors/CreateDoctor";
import { UpdateDoctor } from "../../domain/usecases/doctors/UpdateDoctor";
import { DeleteDoctor } from "../../domain/usecases/doctors/DeleteDoctor";
import { Doctor } from "../../domain/models/Doctor";

export const doctorService = {
  async getAll() {
    return await GetAllDoctors();
  },

  async getById(id) {
    return await GetDoctorById(id);
  },

  async create(data) {
    const doctor = new Doctor(data);
    return await CreateDoctor(doctor);
  },

  async update(id, data) {
    const doctor = new Doctor(data);
    return await UpdateDoctor(id, doctor);
  },

  async remove(id) {
    return await DeleteDoctor(id);
  },
};
