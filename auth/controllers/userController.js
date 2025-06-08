const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
    const {name, email, password} = req.body
    try {
        console.log("In Signing Up...............")
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({name, email, password: hashedPassword})
        console.log(user)
        res.status(201).json({message: "User registered successfully"})       
        } 
    catch (err) {
        res.status(400).json({error: "Registration Failed", details: err.message})
    }
}

exports.loginUser = async (req, res) => {
    const {email, password} = req.body
    try {
        console.log("In logging In ........................")
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({error : "User not found."})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(200).json({error: "Invalid Credentials"})
        }
        const token = jwt.sign({}, process.env.jwt, {expiresIn: '1h'})
        res.json({token})
        } 
    catch (err) {
        res.status(400).json({error: "", details: err.message})
    }
}