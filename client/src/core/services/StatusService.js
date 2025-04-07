export class StatusService {
  constructor(statusRepository) {
    this.statusRepository = statusRepository;
  }

  async create(status) {
    return await this.statusRepository.create(status);
  }

  async getById(id) {
    return await this.statusRepository.getById(id);
  }

  async update(id, status) {
    return await this.statusRepository.update(id, status);
  }

  async delete(id) {
    return await this.statusRepository.delete(id);
  }
}
