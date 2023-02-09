const mongoose = require('mongoose');
const app = require('./app');
require('dotenv').config();

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.DATABASE)
    .then(()=>{
        console.log('DB Connected')
        const port = process.env.PORT || 8000;
        app.listen(port, ()=>{
            console.log(`Server run success on port ${port}`)
        })
    })
    .catch((error)=>console.log(error))
