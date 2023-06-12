require("dotenv").config();
const mongoose = require('mongoose');



mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


mongoose.connection
    .on("open", () => console.log('Mongoose connected'))
    .on("close", () => console.log('Disconnected from Mongoose'))
    .on("error", (error) => console.log('Mongoose error', error));


module.exports = mongoose;