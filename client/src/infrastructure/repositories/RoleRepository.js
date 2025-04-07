import { httpClient } from "../http/httpClient.js";
import { IRoleRepository } from "../../core/repositories/IRoleRepository.js";

export class RoleRepository extends IRoleRepository {
  async create(role) {
    return await httpClient("/roles", {
      method: "POST",
      body: role,
    });
  }

  async getById(id) {
    return await httpClient(`/roles/${id}`);
  }

  async update(id, role) {
    return await httpClient(`/roles/${id}`, {
      method: "PUT",
      body: role,
    });
  }

  async delete(id) {
    return await httpClient(`/roles/${id}`, { method: "DELETE" });
  }
}
