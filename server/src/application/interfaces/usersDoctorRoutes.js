const express = require("express");
const router = express.Router();
const DoctorService = require("../../domain/services/usersDoctorServices");

router.post("/", async (req, res) => {
  const result = await DoctorService.createDoctor(req.body);
  if (!result.success) return res.status(400).json(result);
  res.status(201).json(result);
});

router.get("/:id", async (req, res) => {
  const result = await DoctorService.getDoctorById(req.params.id);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
});

router.put("/:id", async (req, res) => {
  const result = await DoctorService.updateDoctor(req.params.id, req.body);
  if (!result.success) return res.status(400).json(result);
  res.json(result);
});

router.delete("/:id", async (req, res) => {
  const result = await DoctorService.deleteDoctor(req.params.id);
  if (!result.success) return res.status(404).json(result);
  res.json(result);
});

module.exports = router;
