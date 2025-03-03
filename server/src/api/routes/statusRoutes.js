const express = require('express');
const router = express.Router();
const StatusController = require('../controllers/StatusController');

router.put('/:id', StatusController.update);
router.get('/appointment/:appointmentId', StatusController.getStatusByAppointment);

module.exports = router;
