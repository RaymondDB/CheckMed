const express = require("express");
const router = express.Router();
const InsuranceProvidersService = require("../../domain/services/insuranceProviderServices");

router.post("/", async (req, res) => {
    const result = await InsuranceProvidersService.createInsuranceProvider(req.body);
    if (!result.success) return res.status(400).json(result);
    res.status(201).json(result);
  });
  
  router.get("/:id", async (req, res) => {
    const result = await InsuranceProvidersService.getInsuranceProviderById(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  });
  
  router.put("/:id", async (req, res) => {
    const result = await InsuranceProvidersService.updateInsuranceProvider(req.params.id, req.body);
    if (!result.success) return res.status(400).json(result);
    res.json(result);
  });
  
  router.delete("/:id", async (req, res) => {
    const result = await InsuranceProvidersService.deleteInsuranceProvider(req.params.id);
    if (!result.success) return res.status(404).json(result);
    res.json(result);
  });
  
  module.exports = router;