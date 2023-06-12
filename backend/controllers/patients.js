const express = require("express");
const Patients = require("../models/patients");

const router = express.Router();


router.get("/", async (req, res) => {
    const patients = await Patients.find({ deleted: false});
    res.send(patients);

});


router.put('/:id', async (req, res) => {
    try {
        const updatedPatient = await Patients.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.send(updatedPatient);
    } catch (err) {
        res.status(422).send(err);
    }

});


router.post('/add', async (req, res) => {
    try {
        const adedPatient = { ...req.body, deleted: false };
        await Patients.create(adedPatient);
        const patients = await Patients.find({});
        res.send(patients);
    } catch (err) {
        res.status(422).send(err);
    }
});

module.exports = router