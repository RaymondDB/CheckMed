import { UserRepositoryImpl } from "../../../infrastructure/repositoriesImpl/UserRepositoryImpl";

export async function GetAllUsers() {
  return await UserRepositoryImpl.findAll();
}
