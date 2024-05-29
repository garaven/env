class UserConfig {
  constructor() {
    this.userEmail = '';
  }

  setUserEmail(email) {
    this.userEmail = email;
  }

  getUserEmail() {
    return this.userEmail;
  }
}

module.exports = new UserConfig();

