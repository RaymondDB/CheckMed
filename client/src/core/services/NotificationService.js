export class NotificationService {
  constructor(notificationRepository) {
    this.notificationRepository = notificationRepository;
  }

  async create(notification) {
    return await this.notificationRepository.create(notification);
  }

  async getById(id) {
    return await this.notificationRepository.getById(id);
  }

  async delete(id) {
    return await this.notificationRepository.delete(id);
  }
}
