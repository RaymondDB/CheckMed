import { UserRepositoryImpl } from "../../../infrastructure/repositoriesImpl/UserRepositoryImpl";

export async function CreateUser(user) {
  return await UserRepositoryImpl.create(user.toDTO());
}
