const mongoose = require('./connection');
const { v4: uuidv4 } = require('uuid');



const prescriptionsSchema = new mongoose.Schema({
    prescription: String,
    dispense: String,
    refill: String,
    providerName: String,
    providerNumber: Number,
    deaNumber: Number,
    patient: String,
    prescriptionState: {
        type: String,
        enum: ['pending', 'in progress', 'filled'],
        default: 'pending'
    }
});

const Patients = mongoose.model('Prescription', prescriptionsSchema);

module.exports = Patients;