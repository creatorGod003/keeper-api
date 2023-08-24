const express = require('express');
const cors = require('cors');
const connectDb = require('./config/dbConnection')
const errorHandler = require('./middleware/errorhandler');
const dotenv = require('dotenv').config();


connectDb();
const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
    origin:'*'
}))
// below is the middle ware which parses the client information to json format
app.use(express.json());
app.use("/api/contacts", require('./routes/contactRoute'))
app.use("/api/users", require('./routes/userRoute'))

app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
});