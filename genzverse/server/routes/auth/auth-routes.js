const express = require('express');
const { registerUser, loginUser, logoutUser, authMiddleware} = require('../../controls/auth/auth-controller');

const router = express.Router();

router.post('/register',registerUser)   //when the user click on register button the response will be sent to the server
router.post('/login', loginUser) //when the user click on login button the response will be sent to the server
router.post('/logout', logoutUser)
router.get('/check-auth', authMiddleware, (req, res) => {
         const user = req.user;
         res.status(200).json({
             success: true,
             message: 'User authenticated successfully',
             user: {
                 id: user.id,
                 email: user.email,
                 role: user.role,
                 userName:user.userName
             }
         });
})

module.exports = router;