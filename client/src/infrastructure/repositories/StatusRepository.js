import { httpClient } from "../http/httpClient.js";
import { IStatusRepository } from "../../core/repositories/IStatusRepository.js";

export class StatusRepository extends IStatusRepository {
  async create(status) {
    return await httpClient("/status", {
      method: "POST",
      body: status,
    });
  }

  async getById(id) {
    return await httpClient(`/status/${id}`);
  }

  async update(id, status) {
    return await httpClient(`/status/${id}`, {
      method: "PUT",
      body: status,
    });
  }

  async delete(id) {
    return await httpClient(`/status/${id}`, { method: "DELETE" });
  }
}
