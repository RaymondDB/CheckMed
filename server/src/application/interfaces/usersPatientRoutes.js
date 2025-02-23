const express = require("express");
const router = express.Router();
const PatientService = require("../../domain/services/usersPatientServices");

router.post("/", async (req, res) => {
  const result = await PatientService.createPatient(req.body);
  if (!result.success) return res.status(400).json(result);
  res.status(201).json(result);
});

router.get("/:id", async (req, res) => {
  const result = await PatientService.getPatientById(req.params.id);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
});

router.put("/:id", async (req, res) => {
  const result = await PatientService.updatePatient(req.params.id, req.body);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await PatientService.deletePatient(req.params.id);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
});

module.exports = router;
