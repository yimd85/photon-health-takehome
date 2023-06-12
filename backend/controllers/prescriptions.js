const express = require("express");
const Prescriptions = require("../models/prescriptions");

const router = express.Router();


router.get("/:patient", async (req, res) => {
    const prescriptions = await Prescriptions.find({ patient: req.params.patient });
    res.send(prescriptions);
});


router.put("/:patient/:id", async (req, res) => {
    try {
        const updatedPrescription = await Prescriptions.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(updatedPrescription);
    } catch (err) {
        res.status(422).send(err);
    }
});


router.post('/:patient/add', async (req, res) => {
    try {
        const addedPrescription = { ...req.body, patient: req.params.patient };
        await Prescriptions.create(addedPrescription);
        const prescriptions = await Prescriptions.find({ patient: req.params.patient });
        res.send(prescriptions);
    } catch (err) {
        res.status(422).send(err);
    }
});

module.exports = router