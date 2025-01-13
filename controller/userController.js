require('dotenv').config();

// Login de User
const loginUser = async (req, res) => {

    const user = process.env.NAME_USER;
    const pwd = process.env.PWD_USER;
    const mail = await req.body.mail; 
    const password = await req.body.password;
    try {
        if (mail == user && password == pwd) {  
            res.status(200).json({ 
                mail: user,
                pwd: pwd,
            });
        } else {
            res.status(401).json({
                message: "mail ou pwd incorrect",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Problème de Login", 
            error: error.message,
        });
        console.error("Erreur serveur :", error.message);
    }
};

module.exports = {
    loginUser
};
