const userModel = require("../models/user");


module.exports.registerUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body



        if (!username || !email || !password)
            return res.status(400).json({ message: "All fields are required" });

        const existingUser = await userModel.findOne({ $or: [{ username }, { email }] })
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ message: "Username Already Taken!" });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ message: "Email Already Taken!" });
            }
        }

        const hashedPassword = await userModel.hashPassword(password);
        const user = await userModel.create({ username, email, password: hashedPassword });

        const token = userModel.generateAuthToken(user._id);
        res.status(201).json({ token, message: "User Registered Successfully!" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body

        if (!username || !password)
            return res.status(400).json({ message: "Username and password are required" });

        const existingUser = await userModel.findOne({ username })
        if (!existingUser) {
            return res.status(404).json({ message: "User Name Not Found!" })
        }

        const isPasswordMatched = await userModel.comparePassword(password, existingUser.password)

        if (!isPasswordMatched) {
            return res.status(401).json({ message: "Invalid Or Wrong Password!" })
        }

        const token = await userModel.generateAuthToken(existingUser._id)
        const userDetails = { username: existingUser.username, role: existingUser.role, avatar: existingUser.avatar }
        return res.status(200).json({ token, userDetails, message: "Login Successful!" })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}