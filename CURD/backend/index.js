const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors())
app.use(express.json())




const userRouter = require('./routes/userRoute')

app.use('/user', userRouter)




mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology : true
  })
  .then(()=> console.log("mongo connected"))
  .catch((err) => console.log(err))



app.listen(PORT, () => {
    console.log(`server is running on PORT ${PORT}`)
  })