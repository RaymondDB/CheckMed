import { Doctor } from "../../models/Doctor";
import { DoctorRepositoryImpl } from "../../../infrastructure/repositoriesImpl/DoctorRepositoryImpl";

export async function GetDoctorById(id) {
  const data = await DoctorRepositoryImpl.findById(id);
  return Doctor.fromDTO(data);
}
