import { Doctor } from "../../models/Doctor";
import { DoctorRepositoryImpl } from "../../../infrastructure/repositoriesImpl/DoctorRepositoryImpl";

export async function GetAllDoctors() {
  const data = await DoctorRepositoryImpl.findAll();
  return data.map(Doctor.fromDTO);
}
