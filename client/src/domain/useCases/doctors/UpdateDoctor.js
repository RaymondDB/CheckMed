import { DoctorRepositoryImpl } from "../../../infrastructure/repositoriesImpl/DoctorRepositoryImpl";

export async function UpdateDoctor(id, doctor) {
  return await DoctorRepositoryImpl.update(id, doctor.toDTO());
}
