const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');


//register
const registerUser = async (req, res) => {
    console.log("Request Body:", req.body);
    const { userName, email, password } = req.body;
    try {

        const existingUser = await User.findOne({ email });
        if (existingUser)
            return res.json({ success: false, message: 'User already exists' });

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        });
        await newUser.save();
        res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (e) {
        console.error(e);
        if (e.name === 'ValidationError') {
            return res.status(400).json({ success: false, message: 'Validation failed', errors: e.errors });
        }
        if (e.code === 11000) { // Duplicate key error
            return res.json({ success: false, message: 'User already exists', error: e.keyValue });
        }
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}


//login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.json({ success: false, message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordValid) return res.json({ success: false, message: 'Invalid password' });

        const token = jwt.sign({ id: checkUser._id, role: checkUser.role, email: checkUser.email,userName:checkUser.userName },
            process.env.JWT_SECRET || 'CLIENT SECRET KEY',
            {expiresIn: '1h'})

        res.cookie('token', token, {
            httpOnly: true,
            secure: false, // Set to true if using HTTPS
        }).json({
            success: true,
            message: 'LoggedIn successfully',
            user: {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role,
                userName:checkUser.userName,
            }
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}



//logout

const logoutUser = (req,res)=>{
    res.clearCookie('token').json({ success: true, message: 'Logged out successfully' });
}






//auth middleware
const authMiddleware = async(req,res,next)=>{
    const token =req.cookies.token;
    if(!token) return res.status(401).json({ success: false, message: 'Unauthorized' });
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT SECRET KEY");
        req.user = decoded;
        next();
        
    }catch(error){
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
}



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    authMiddleware,
}