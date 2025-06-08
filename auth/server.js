const express = require('express')
const connectDB = require('../auth/config/db')
const userRoutes = require('../auth/routes/userRoutes')
require('dotenv').config();

const app = express()
app.use(express.json())
connectDB()

app.use('api/auth', userRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=> console.log(`Server is running on ${PORT}.`))