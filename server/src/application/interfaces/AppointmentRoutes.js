const express = require("express");
const router = express.Router();
const AppointmentService = require("../../domain/services/AppointmentService");

router.post("/", async (req, res) => {
    const result = await AppointmentService.create(req.body);
    if (!result.success) return res.status(400).json(result);
    res.status(201).json(result);
  });
  
  router.get("/:id", async (req, res) => {
    const result = await AppointmentService.getAppointmentServiceById(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  });
  
  router.put("/:id", async (req, res) => {
    const result = await InsuranceNetworkTypeService.updateInsuranceNetworkType(req.params.id, req.body);
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  });
  
  router.delete("/:id", async (req, res) => {
    const result = await InsuranceNetworkTypeService.deleteInsuranceNetworkType(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  });
  
  module.exports = router;