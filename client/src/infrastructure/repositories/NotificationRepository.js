import { httpClient } from "../http/httpClient.js";
import { INotificationRepository } from "../../core/repositories/INotificationRepository.js";

export class NotificationRepository extends INotificationRepository {
  async create(notification) {
    return await httpClient("/notifications", {
      method: "POST",
      body: notification,
    });
  }

  async getById(id) {
    return await httpClient(`/notifications/${id}`);
  }

  async delete(id) {
    return await httpClient(`/notifications/${id}`, { method: "DELETE" });
  }
}
