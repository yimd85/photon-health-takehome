require("dotenv").config();
const express = require('express');
const patientsRouter = require("./controllers/patients");
const prescriptionsRouter = require("./controllers/prescriptions");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api/patient", patientsRouter);
app.use("/api/prescription", prescriptionsRouter);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build')); 
	const path = require('path');
	app.get('*', (req, res) => { 
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
});