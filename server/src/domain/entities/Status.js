class Status {
  constructor(id = null, name, createdAt = new Date(), updatedAt = new Date()) {
    this.id = id;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  update(data) {
    if (data.name) this.name = data.name;
    this.updatedAt = new Date();
    return this;
  }

  static fromDatabase(data) {
    return new Status(
      data.id,
      data.name,
      data.createdAt || new Date(),
      data.updatedAt || new Date()
    );
  }

  toDatabase() {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Status;