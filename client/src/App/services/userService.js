import { GetAllUsers } from "../../domain/usecases/users/GetAllUsers";
import { GetUserById } from "../../domain/usecases/users/GetUserById";
import { CreateUser } from "../../domain/usecases/users/CreateUser";
import { UpdateUser } from "../../domain/usecases/users/UpdateUser";
import { DeleteUser } from "../../domain/usecases/users/DeleteUser";
import { User } from "../../domain/models/User";

export const userService = {
  async getAll() {
    const users = await GetAllUsers();
    return users;
  },

  async getById(id) {
    const user = await GetUserById(id);
    return user;
  },

  async create(data) {
    const newUser = new User(data);
    return await CreateUser(newUser);
  },

  async update(id, data) {
    const updatedUser = new User(data);
    return await UpdateUser(id, updatedUser);
  },

  async remove(id) {
    return await DeleteUser(id);
  }
};
