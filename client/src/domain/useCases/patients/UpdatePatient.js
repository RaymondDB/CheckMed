import { PatientRepositoryImpl } from "../../../infrastructure/repositoriesImpl/PatientRepositoryImpl";

export async function UpdatePatient(id, patient) {
  return await PatientRepositoryImpl.update(id, patient.toDTO());
}
