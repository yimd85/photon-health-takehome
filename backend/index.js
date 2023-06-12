require("dotenv").config();
const express = require('express');
const patientsRouter = require("./controllers/patients");
const prescriptionsRouter = require("./controllers/prescriptions");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/patient", patientsRouter);
app.use("/api/prescription", prescriptionsRouter);

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});