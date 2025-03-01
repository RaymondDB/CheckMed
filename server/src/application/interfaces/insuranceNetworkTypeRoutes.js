const express = require("express");
const router = express.Router();
const InsuranceNetworkTypeService = require("../../domain/services/insuranceNetworkTypeServices");

router.post("/", async (req, res) => {
    const result = await InsuranceNetworkTypeService.createInsuranceNetworkTypeService(req.body);
    if (!result.success) return res.status(400).json(result);
    res.status(201).json(result);
  });
  
  router.get("/:id", async (req, res) => {
    const result = await InsuranceNetworkTypeService.getInsuranceNetworkTypeById(req.params.id);
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