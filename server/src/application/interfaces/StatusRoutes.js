const express = require('express');
const router = require('./routes/status');

class StatusRoutes {
  static init(app) {
    app.use('/status', router);
  }
}

module.exports = StatusRoutes;
