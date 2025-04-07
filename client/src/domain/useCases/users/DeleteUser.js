import { UserRepositoryImpl } from "../../../infrastructure/repositoriesImpl/UserRepositoryImpl";

export async function DeleteUser(id) {
  return await UserRepositoryImpl.remove(id);
}
