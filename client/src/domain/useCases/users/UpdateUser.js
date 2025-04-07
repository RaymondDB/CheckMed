import { UserRepositoryImpl } from "../../../infrastructure/repositoriesImpl/UserRepositoryImpl";

export async function UpdateUser(id, user) {
  return await UserRepositoryImpl.update(id, user.toDTO());
}
