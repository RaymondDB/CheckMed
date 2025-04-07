import { UserRepositoryImpl } from "../../../infrastructure/repositoriesImpl/UserRepositoryImpl";

export async function GetUserById(id) {
  return await UserRepositoryImpl.findById(id);
}
