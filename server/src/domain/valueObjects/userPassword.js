//Aun no implementado

const bcrypt = require('bcrypt');

class Password {
  constructor(password, isHashed = false) {
    if (!isHashed && !this.isValid(password)) {
      throw new Error('Password does not meet security requirements.');
    }

    this.password = isHashed ? password : this.hashPassword(password);
  }

  isValid(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  }

  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async comparePassword(inputPassword) {
    return await bcrypt.compare(inputPassword, this.password);
  }

  toString() {
    return this.password;
  }
}

module.exports = Password;