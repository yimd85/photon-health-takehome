const mongoose = require('./connection');
const { v4: uuidv4 } = require('uuid');



const patientsSchema = new mongoose.Schema({
    _id: {
        type: String, default: () => {
            return uuidv4();
        }
    },
    firstName: String,
    lastName: String,
    dob: Date,
    phoneNumber: Number,
    deleted: Boolean,
});

const Patients = mongoose.model('Patient', patientsSchema);

module.exports = Patients;