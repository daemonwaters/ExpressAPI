const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const usersRouter = require('./routes/users');


app.use(express.json())
app.use('/users',usersRouter);

app.listen(PORT,()=>{
    console.log(`Got the Server Up and Running on Port : ${PORT}`)
})




